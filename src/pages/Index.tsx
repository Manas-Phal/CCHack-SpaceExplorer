
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Camera, Eye, Filter, MapPin, Search, Star, Trophy, Upload, User, Zap, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import StarField from '../components/StarField';
import CelestialObjects from '../components/CelestialObjects';
import SkyEvents from '../components/SkyEvents';
import ObservationTracker from '../components/ObservationTracker';
import UserProfile from '../components/UserProfile';
import AuthModal from '../components/AuthModal';
import StarMap3D from '../components/StarMap3D';
import SkyTonight from '../components/SkyTonight';

const Index = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('explore');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [starMapOpen, setStarMapOpen] = useState(false);
  const [skyTonightOpen, setSkyTonightOpen] = useState(false);
  const [userLevel] = useState(3);
  const [badges] = useState(['First Light', 'Star Gazer', 'Deep Space']);

  const handleStartExploring = () => {
    if (user) {
      setStarMapOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleViewSkyTonight = () => {
    setSkyTonightOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (starMapOpen) {
    return <StarMap3D onBack={() => setStarMapOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <StarField />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-purple-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Space Explorer+
            </h1>
            <p className="text-xs text-gray-300">Discover the Universe</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Level {userLevel}
              </Badge>
              <span className="text-sm text-gray-300">
                {user.displayName || user.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-purple-300 hover:bg-purple-500/20"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setAuthModalOpen(true)}
              className="text-purple-300 hover:bg-purple-500/20"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            Explore the Cosmos
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Track celestial objects, discover constellations, and unlock the mysteries of space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              onClick={handleStartExploring}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Exploring
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleViewSkyTonight}
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Sky Tonight
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-black/30 backdrop-blur-sm border border-purple-500/30">
              <TabsTrigger value="explore" className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white">
                <Search className="w-4 h-4 mr-2" />
                Explore
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="tracker" className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white">
                <Camera className="w-4 h-4 mr-2" />
                Track
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explore" className="mt-8">
              <CelestialObjects />
            </TabsContent>

            <TabsContent value="events" className="mt-8">
              <SkyEvents />
            </TabsContent>

            <TabsContent value="tracker" className="mt-8">
              <ObservationTracker />
            </TabsContent>

            <TabsContent value="profile" className="mt-8">
              <UserProfile userLevel={userLevel} badges={badges} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <SkyTonight open={skyTonightOpen} onOpenChange={setSkyTonightOpen} />
    </div>
  );
};

export default Index;
