
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useRealStockData } from '@/hooks/useRealStockData';
import { Trash2, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

const WatchlistManager = () => {
  const { watchlist, loading, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [newSymbol, setNewSymbol] = useState('');
  const [newName, setNewName] = useState('');

  const handleAddStock = async () => {
    if (!newSymbol.trim()) {
      toast.error('Please enter a stock symbol');
      return;
    }

    const { error } = await addToWatchlist(newSymbol.toUpperCase(), newName || newSymbol.toUpperCase());
    
    if (error) {
      toast.error('Failed to add stock to watchlist');
    } else {
      toast.success(`Added ${newSymbol.toUpperCase()} to watchlist`);
      setNewSymbol('');
      setNewName('');
    }
  };

  const handleRemoveStock = async (id: string, symbol: string) => {
    const { error } = await removeFromWatchlist(id);
    if (error) {
      toast.error('Failed to remove from watchlist');
    } else {
      toast.success(`Removed ${symbol} from watchlist`);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading watchlist...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Stock symbol (e.g., AAPL)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Company name (optional)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddStock}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {watchlist.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No stocks in your watchlist yet. Add some to get started!
            </p>
          ) : (
            watchlist.map((item) => (
              <WatchlistItem
                key={item.id}
                item={item}
                onRemove={handleRemoveStock}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const WatchlistItem = ({ item, onRemove }: { item: any; onRemove: (id: string, symbol: string) => void }) => {
  const { stockData, loading } = useRealStockData(item.symbol);

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <div>
          <Badge variant="secondary">{item.symbol}</Badge>
          <p className="text-sm text-muted-foreground mt-1">{item.name}</p>
        </div>
        {stockData && (
          <div className="text-right">
            <p className="font-semibold">${stockData.price.toFixed(2)}</p>
            <div className={`flex items-center gap-1 text-sm ${
              stockData.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stockData.change >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {stockData.changePercent.toFixed(2)}%
            </div>
          </div>
        )}
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => onRemove(item.id, item.symbol)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WatchlistManager;
