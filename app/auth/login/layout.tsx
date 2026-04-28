import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — Orbis',
  description: 'Sign in to your Orbis account to manage bookings and your wishlist.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
