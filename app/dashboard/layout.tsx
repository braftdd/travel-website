import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Dashboard — Orbis',
  description: 'Manage your Orbis bookings, wishlist and account.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
