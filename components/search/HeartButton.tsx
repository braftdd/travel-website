'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

interface Props {
  type: 'stay' | 'flight' | 'package';
  referenceId: string;
}

export default function HeartButton({ type, referenceId }: Props) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        const { data } = await supabase
          .from('saved_items')
          .select('id')
          .eq('user_id', uid)
          .eq('type', type)
          .eq('reference_id', referenceId)
          .maybeSingle();
        setSaved(!!data);
      }
    }
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      router.push('/auth/login');
      return;
    }
    if (saved) {
      await supabase
        .from('saved_items')
        .delete()
        .eq('user_id', userId)
        .eq('type', type)
        .eq('reference_id', referenceId);
      setSaved(false);
    } else {
      await supabase
        .from('saved_items')
        .insert({ user_id: userId, type, reference_id: referenceId });
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? 'Remove from saved' : 'Save'}
      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm
                 flex items-center justify-center shadow-md z-10
                 hover:scale-110 transition-transform duration-200"
    >
      <Heart
        className="w-4 h-4"
        fill={saved ? '#C9A96E' : 'none'}
        stroke={saved ? '#C9A96E' : '#1B2D4F'}
        strokeWidth={2}
      />
    </button>
  );
}
