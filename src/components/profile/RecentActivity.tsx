
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, Eye } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: 'watchlist',
      action: 'Added AAPL to watchlist',
      time: '2 hours ago',
      icon: Eye
    },
    {
      type: 'portfolio',
      action: 'Updated portfolio allocation',
      time: '1 day ago',
      icon: TrendingUp
    },
    {
      type: 'profile',
      action: 'Updated profile information',
      time: '3 days ago',
      icon: Clock
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2 last:border-b-0">
              <div className="flex items-center gap-3">
                <activity.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{activity.action}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activity.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
