
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  added_at: string;
}

export const useWatchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', user?.id)
        .order('added_at', { ascending: false });

      if (error) throw error;
      setWatchlist(data || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (symbol: string, name: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .insert({ user_id: user?.id, symbol, name });

      if (error) throw error;
      await fetchWatchlist();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const removeFromWatchlist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchWatchlist();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return { watchlist, loading, addToWatchlist, removeFromWatchlist, refetch: fetchWatchlist };
};
