export interface RepositoryDependency {
  name: string;
  version: string;
}

export interface Repository {
  id: string;
  name: string;
  summary: string;
  teamOwner: string;
  primaryLanguage: string;
  primaryLanguageIcon?: string; // Optional: icon URL or name
  sourceUrl: string;
  dependencies: RepositoryDependency[];
} 