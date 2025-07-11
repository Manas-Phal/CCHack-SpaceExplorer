
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, Eye, Calendar, Award, Target, Zap, Crown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface UserProfileProps {
  userLevel: number;
  badges: string[];
}

const achievementBadges = [
  { name: 'First Light', icon: <Star className="w-4 h-4" />, description: 'Made your first observation', unlocked: true, color: 'text-yellow-400' },
  { name: 'Star Gazer', icon: <Eye className="w-4 h-4" />, description: 'Observed 10 different objects', unlocked: true, color: 'text-blue-400' },
  { name: 'Deep Space', icon: <Zap className="w-4 h-4" />, description: 'Observed 5 deep space objects', unlocked: true, color: 'text-purple-400' },
  { name: 'Planet Hunter', icon: <Target className="w-4 h-4" />, description: 'Observed all visible planets', unlocked: false, color: 'text-green-400' },
  { name: 'Constellation Master', icon: <Crown className="w-4 h-4" />, description: 'Identified 20 constellations', unlocked: false, color: 'text-red-400' },
  { name: 'Night Owl', icon: <Calendar className="w-4 h-4" />, description: '30-day observation streak', unlocked: false, color: 'text-orange-400' },
];

const UserProfile: React.FC<UserProfileProps> = ({ userLevel, badges }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20 text-center py-12">
        <CardContent>
          <div className="text-gray-400 mb-4">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Sign in to view your profile</p>
            <p className="text-sm">Track your progress and achievements</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const nextLevelProgress = ((userLevel * 10) % 100);
  const totalObservations = 23; // This would come from Firestore
  const uniqueObjects = 15;
  const currentStreak = 7;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Astronomer Profile
        </h2>
        <p className="text-gray-300">Your journey through the cosmos</p>
      </div>

      {/* Profile Header */}
      <Card className="glassmorphism hover-glow">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-2 border-purple-500/50 animate-pulse-glow">
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                {user.displayName || 'Stargazer'}
              </h3>
              <p className="text-gray-300 mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Level {userLevel}
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  <Star className="w-3 h-3 mr-1" />
                  {totalObservations} Observations
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Target className="w-3 h-3 mr-1" />
                  {uniqueObjects} Objects
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Level {userLevel} Progress</span>
                  <span className="text-sm text-purple-300">{Math.floor(nextLevelProgress)}%</span>
                </div>
                <Progress value={nextLevelProgress} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {['overview', 'achievements', 'stats'].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
            className={`capitalize transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/20'
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glassmorphism hover-glow animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Star className="w-4 h-4 text-yellow-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">Observed Jupiter</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Eye className="w-4 h-4 text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">Tracked Andromeda Galaxy</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <Trophy className="w-4 h-4 text-green-400" />
                <div className="flex-1">
                  <p className="text-sm text-white">Earned "Deep Space" badge</p>
                  <p className="text-xs text-gray-400">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism hover-glow animate-fade-in animate-stagger-2">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-orange-400 animate-glow">
                  {currentStreak}
                </div>
                <p className="text-gray-300">Consecutive observation days</p>
                <div className="flex justify-center gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < currentStreak 
                          ? 'bg-orange-400 animate-pulse-glow' 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">Keep observing to maintain your streak!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievementBadges.map((badge, index) => (
            <Card 
              key={badge.name}
              className={`glassmorphism transition-all duration-300 hover-scale animate-fade-in ${
                badge.unlocked 
                  ? 'hover-glow border-purple-500/40' 
                  : 'opacity-60 hover:opacity-80'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full border-2 flex items-center justify-center ${
                  badge.unlocked 
                    ? `border-current ${badge.color} animate-pulse-glow` 
                    : 'border-gray-600 text-gray-600'
                }`}>
                  {badge.icon}
                </div>
                <h4 className={`font-semibold mb-2 ${badge.unlocked ? 'text-white' : 'text-gray-400'}`}>
                  {badge.name}
                </h4>
                <p className={`text-xs ${badge.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                  {badge.description}
                </p>
                {badge.unlocked && (
                  <Badge className="mt-2 bg-green-500/20 text-green-300 border-green-500/30">
                    <Award className="w-3 h-3 mr-1" />
                    Unlocked
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glassmorphism hover-glow animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                Observation Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-400">{totalObservations}</div>
                  <div className="text-sm text-gray-400">Total Observations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">{uniqueObjects}</div>
                  <div className="text-sm text-gray-400">Unique Objects</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Planets</span>
                  <span className="text-sm text-white">5/8</span>
                </div>
                <Progress value={62.5} className="h-1" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Nebulae</span>
                  <span className="text-sm text-white">3/12</span>
                </div>
                <Progress value={25} className="h-1" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Galaxies</span>
                  <span className="text-sm text-white">2/8</span>
                </div>
                <Progress value={25} className="h-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism hover-glow animate-fade-in animate-stagger-2">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm text-white">25 Observations</p>
                    <p className="text-xs text-gray-400">2 more to go!</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Level 4</p>
                    <p className="text-xs text-gray-400">15 observations needed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm text-white">Constellation Master</p>
                    <p className="text-xs text-gray-400">Find 15 more constellations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
