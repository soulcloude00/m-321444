
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import ProfileCard from '@/components/profile/ProfileCard';
import { useWatchlist } from '@/hooks/useWatchlist';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { watchlist, loading, removeFromWatchlist } = useWatchlist();

  const handleRemoveFromWatchlist = async (id: string) => {
    const { error } = await removeFromWatchlist(id);
    if (error) {
      toast.error('Failed to remove from watchlist');
    } else {
      toast.success('Removed from watchlist');
    }
  };

  return (
    <PageLayout title="Profile">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCard />
        
        <Card>
          <CardHeader>
            <CardTitle>Watchlist</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading watchlist...</p>
            ) : watchlist.length === 0 ? (
              <p className="text-muted-foreground">No stocks in your watchlist yet.</p>
            ) : (
              <div className="space-y-2">
                {watchlist.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <Badge variant="secondary">{item.symbol}</Badge>
                      <span className="ml-2 text-sm">{item.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFromWatchlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Profile;
