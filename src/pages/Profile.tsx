
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileStats from '@/components/profile/ProfileStats';
import RecentActivity from '@/components/profile/RecentActivity';
import AccountSettings from '@/components/profile/AccountSettings';
import WatchlistManager from '@/components/profile/WatchlistManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Eye, Activity } from 'lucide-react';

const Profile = () => {
  return (
    <PageLayout title="Profile">
      <div className="space-y-6">
        {/* Profile Stats Overview */}
        <ProfileStats />
        
        {/* Main Profile Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProfileCard />
              <RecentActivity />
            </div>
          </TabsContent>
          
          <TabsContent value="watchlist" className="space-y-6">
            <WatchlistManager />
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            <RecentActivity />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Profile;
