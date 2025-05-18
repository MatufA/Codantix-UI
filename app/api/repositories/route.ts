import { NextResponse } from 'next/server';

const teams = [
  { id: 1, name: 'Platform' },
  { id: 2, name: 'AI Team' },
  { id: 3, name: 'Frontend' },
  { id: 4, name: 'DevOps' },
];

const repositories = [
  {
    id: 1,
    name: 'codantix-ui',
    summary: 'Frontend UI for Codantix platform.',
    teamOwner: teams[2].name,
    primaryLanguage: 'TypeScript',
    primaryLanguageIcon: 'typescript.svg',
    sourceUrl: 'https://github.com/company/codantix-ui',
    dependencies: [
      { name: 'react', version: '18.2.0' },
      { name: 'next', version: '13.4.0' },
      { name: 'tailwindcss', version: '3.3.2' },
    ],
  },
  {
    id: 2,
    name: 'codantix-backend',
    summary: 'Backend API for Codantix.',
    teamOwner: teams[0].name,
    primaryLanguage: 'Python',
    primaryLanguageIcon: 'python.svg',
    sourceUrl: 'https://github.com/company/codantix-backend',
    dependencies: [
      { name: 'fastapi', version: '0.95.0' },
      { name: 'sqlalchemy', version: '1.4.0' },
    ],
  },
  {
    id: 3,
    name: 'codantix-ai',
    summary: 'AI chat and vector search service.',
    teamOwner: teams[1].name,
    primaryLanguage: 'Python',
    primaryLanguageIcon: 'python.svg',
    sourceUrl: 'https://github.com/company/codantix-ai',
    dependencies: [
      { name: 'transformers', version: '4.28.0' },
      { name: 'faiss', version: '1.7.3' },
    ],
  },
  {
    id: 4,
    name: 'codantix-deploy',
    summary: 'Deployment automation scripts.',
    teamOwner: teams[3].name,
    primaryLanguage: 'Shell',
    primaryLanguageIcon: 'shell.svg',
    sourceUrl: 'https://github.com/company/codantix-deploy',
    dependencies: [
      { name: 'ansible', version: '2.10.0' },
    ],
  },
];

export async function GET() {
  return NextResponse.json(repositories);
} 