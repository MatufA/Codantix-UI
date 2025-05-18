'use client';
import Toolbar from './Toolbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toolbar />
      {children}
    </>
  );
} 