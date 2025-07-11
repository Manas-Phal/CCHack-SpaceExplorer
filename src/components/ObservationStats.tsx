
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Calendar, Trophy } from 'lucide-react';

interface ObservationStatsProps {
  totalObservations: number;
  uniqueObjects: number;
  currentStreak: number;
  level: number;
}

const ObservationStats: React.FC<ObservationStatsProps> = ({
  totalObservations,
  uniqueObjects,
  currentStreak,
  level
}) => {
  const nextLevelProgress = ((totalObservations % 10) / 10) * 100;

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Observation Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{totalObservations}</div>
            <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
              <Eye className="w-3 h-3" />
              Total Observations
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{uniqueObjects}</div>
            <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
              <Star className="w-3 h-3" />
              Unique Objects
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Level {level} Progress</span>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              {Math.floor(nextLevelProgress)}%
            </Badge>
          </div>
          <Progress value={nextLevelProgress} className="h-2" />
        </div>

        <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
          <Calendar className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-orange-300">
            {currentStreak} day observation streak!
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ObservationStats;
