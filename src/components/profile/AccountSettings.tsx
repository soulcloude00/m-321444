
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Shield, Mail, Eye } from 'lucide-react';
import { toast } from 'sonner';

const AccountSettings = () => {
  const { signOut } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    trading: true,
    news: false
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification settings updated');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(value) => handleNotificationChange('email', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={(value) => handleNotificationChange('push', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="trading-alerts">Trading Alerts</Label>
                <p className="text-sm text-muted-foreground">Price and volume alerts</p>
              </div>
              <Switch
                id="trading-alerts"
                checked={notifications.trading}
                onCheckedChange={(value) => handleNotificationChange('trading', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="news-updates">News Updates</Label>
                <p className="text-sm text-muted-foreground">Market news and analysis</p>
              </div>
              <Switch
                id="news-updates"
                checked={notifications.news}
                onCheckedChange={(value) => handleNotificationChange('news', value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Make profile visible to others</p>
              </div>
              <Switch id="profile-visibility" defaultChecked={false} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="portfolio-sharing">Portfolio Sharing</Label>
                <p className="text-sm text-muted-foreground">Allow others to view your portfolio</p>
              </div>
              <Switch id="portfolio-sharing" defaultChecked={false} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="pt-4">
          <Button variant="destructive" onClick={signOut} className="w-full">
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
