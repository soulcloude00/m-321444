
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RealStockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdated: Date;
}

export const useRealStockData = (symbol?: string) => {
  const [stockData, setStockData] = useState<RealStockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async (stockSymbol: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('stock-data', {
        body: { symbol: stockSymbol }
      });

      if (error) throw error;
      
      setStockData({
        ...data,
        lastUpdated: new Date(data.lastUpdated)
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchStockData(symbol);
    }
  }, [symbol]);

  return { stockData, loading, error, refetch: () => symbol && fetchStockData(symbol) };
};
