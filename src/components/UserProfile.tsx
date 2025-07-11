
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Eye, Calendar, Award, Target } from 'lucide-react';

interface UserProfileProps {
  userLevel: number;
  badges: string[];
}

const achievements = [
  { id: 1, name: 'First Light', description: 'Made your first observation', icon: '🔭', earned: true },
  { id: 2, name: 'Star Gazer', description: 'Observed 10 different objects', icon: '⭐', earned: true },
  { id: 3, name: 'Deep Space', description: 'Observed 5 deep space objects', icon: '🌌', earned: true },
  { id: 4, name: 'Planet Hunter', description: 'Observed all visible planets', icon: '🪐', earned: false },
  { id: 5, name: 'Meteor Watcher', description: 'Logged 3 meteor shower observations', icon: '☄️', earned: false },
  { id: 6, name: 'Galaxy Explorer', description: 'Observed 10 different galaxies', icon: '🌀', earned: false },
  { id: 7, name: 'Nebula Seeker', description: 'Observed 15 different nebulae', icon: '🌟', earned: false },
  { id: 8, name: 'Constellation Master', description: 'Identified all 88 constellations', icon: '⭐', earned: false }
];

const challenges = [
  { id: 1, name: 'Messier Marathon', description: 'Observe all 110 Messier objects', progress: 45, total: 110 },
  { id: 2, name: 'Solar System Tour', description: 'Observe all planets in one month', progress: 6, total: 8 },
  { id: 3, name: 'Double Star Challenge', description: 'Observe 50 double star systems', progress: 23, total: 50 }
];

const UserProfile: React.FC<UserProfileProps> = ({ userLevel, badges }) => {
  const levelProgress = ((userLevel % 1) * 100) || 75; // Mock progress to next level
  const totalObservations = 127;
  const totalHours = 89;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Astronomer Profile
        </h2>
        <p className="text-gray-300">Track your progress and achievements</p>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Level {userLevel}</CardTitle>
            <CardDescription>Explorer Astronomer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress to Level {userLevel + 1}</span>
                <span className="text-white">{levelProgress}%</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="text-center pb-2">
            <Eye className="w-12 h-12 mx-auto text-blue-400 mb-2" />
            <CardTitle className="text-2xl text-white">{totalObservations}</CardTitle>
            <CardDescription>Observations Made</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-400">This Month: 15</p>
              <p className="text-sm text-gray-400">This Week: 4</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="text-center pb-2">
            <Calendar className="w-12 h-12 mx-auto text-purple-400 mb-2" />
            <CardTitle className="text-2xl text-white">{totalHours}h</CardTitle>
            <CardDescription>Observing Time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-sm text-gray-400">Average: 2.5h/session</p>
              <p className="text-sm text-gray-400">Best: 6h in one night</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
          <CardDescription>Unlock badges by completing observations and challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                    : 'bg-gray-500/10 border-gray-500/20 opacity-60'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">{achievement.icon}</div>
                  <h4 className={`font-semibold ${achievement.earned ? 'text-yellow-300' : 'text-gray-400'}`}>
                    {achievement.name}
                  </h4>
                  <p className="text-xs text-gray-400">{achievement.description}</p>
                  {achievement.earned && (
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      Earned
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Challenges
          </CardTitle>
          <CardDescription>Complete these challenges to earn experience and badges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">{challenge.name}</h4>
                <span className="text-sm text-gray-400">
                  {challenge.progress}/{challenge.total}
                </span>
              </div>
              <p className="text-sm text-gray-400">{challenge.description}</p>
              <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          View Full Statistics
        </Button>
        <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
          Share Profile
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
