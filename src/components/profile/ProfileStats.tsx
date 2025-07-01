
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWatchlist } from '@/hooks/useWatchlist';
import { TrendingUp, Eye, PieChart, Calendar } from 'lucide-react';

const ProfileStats = () => {
  const { watchlist } = useWatchlist();

  const stats = [
    {
      title: 'Watchlist Items',
      value: watchlist.length,
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      title: 'Portfolio Value',
      value: '$0',
      icon: PieChart,
      color: 'text-green-600'
    },
    {
      title: 'Active Trades',
      value: '0',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Member Since',
      value: new Date().getFullYear(),
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileStats;
