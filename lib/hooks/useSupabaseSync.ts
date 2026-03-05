import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { usePartnerStore } from '@/lib/stores/partner-store';

/**
 * Auto-syncs partner store with Supabase when auth state changes.
 * Call this once at app root level.
 */
export function useSupabaseSync() {
  const { user } = useAuth();
  const setUserId = usePartnerStore((s) => s.setUserId);
  const syncFromSupabase = usePartnerStore((s) => s.syncFromSupabase);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      syncFromSupabase();
    } else {
      setUserId(null);
    }
  }, [user?.id]);
}
