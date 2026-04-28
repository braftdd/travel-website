import { Suspense } from 'react';
import SearchPageClient from '@/components/search/SearchPageClient';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Search Results — Orbis',
  description: 'Search luxury hotels, flights and packages in Thailand, UAE, America, Europe and the Maldives.',
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SearchPageClient />
      </Suspense>
    </>
  );
}
