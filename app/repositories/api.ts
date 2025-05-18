import { Repository } from './types';

// Placeholder API endpoint
const API_URL = '/api/repositories';

export async function fetchRepositories(): Promise<Repository[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return res.json();
} 