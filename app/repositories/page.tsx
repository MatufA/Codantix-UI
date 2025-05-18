'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { fetchRepositories } from './api';
import { Repository } from './types';
import { RepositoryCard } from './RepositoryCard';
import { RepositoryDetailModal } from './RepositoryDetailModal';
import { BrandedMultiSelect } from './BrandedMultiSelect';

const REPOS_PER_PAGE = 8;

const getUnique = (arr: string[]) => Array.from(new Set(arr)).sort();

const RepositoryCatalogPage: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState<string[]>([]);
  const [langFilter, setLangFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRepositories()
      .then(setRepositories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Unique teams and languages for filters
  const allTeams = useMemo(() => getUnique(repositories.map(r => r.teamOwner)), [repositories]);
  const allLangs = useMemo(() => getUnique(repositories.map(r => r.primaryLanguage)), [repositories]);

  // Filtered and searched repositories
  const filtered = useMemo(() => {
    return repositories.filter(repo => {
      const matchesSearch =
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        repo.summary.toLowerCase().includes(search.toLowerCase());
      const matchesTeam = teamFilter.length === 0 || teamFilter.includes(repo.teamOwner);
      const matchesLang = langFilter.length === 0 || langFilter.includes(repo.primaryLanguage);
      return matchesSearch && matchesTeam && matchesLang;
    });
  }, [repositories, search, teamFilter, langFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / REPOS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * REPOS_PER_PAGE, page * REPOS_PER_PAGE);

  // Reset page if filters/search change
  useEffect(() => { setPage(1); }, [search, teamFilter, langFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Repository Catalog</h1>
      {/* Filters/Search UI */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or summary..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="w-56">
          <BrandedMultiSelect
            label="Team Owner"
            options={allTeams.map(t => ({ label: t, value: t }))}
            value={teamFilter}
            onChange={setTeamFilter}
            placeholder="All teams"
          />
        </div>
        <div className="w-56">
          <BrandedMultiSelect
            label="Primary Language"
            options={allLangs.map(l => ({ label: l, value: l }))}
            value={langFilter}
            onChange={setLangFilter}
            placeholder="All languages"
          />
        </div>
      </div>
      {loading && <div>Loading repositories...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div>No repositories found.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            onClick={() => setSelectedRepository(repo)}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      {filtered.length > REPOS_PER_PAGE && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {selectedRepository && (
        <RepositoryDetailModal
          repository={selectedRepository}
          onClose={() => setSelectedRepository(null)}
        />
      )}
    </div>
  );
};

export default RepositoryCatalogPage; 