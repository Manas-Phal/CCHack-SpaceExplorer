
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Eye, Loader2 } from 'lucide-react';

interface SkyTonightProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SkyObject {
  name: string;
  type: string;
  constellation: string;
  magnitude: number;
  visibility: string;
  description: string;
}

const SkyTonight: React.FC<SkyTonightProps> = ({ open, onOpenChange }) => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [skyData, setSkyData] = useState<SkyObject[]>([]);

  // Dummy data for fallback
  const fallbackData: SkyObject[] = [
    {
      name: "Jupiter",
      type: "Planet",
      constellation: "Taurus",
      magnitude: -2.5,
      visibility: "Excellent",
      description: "Bright and prominent in the evening sky"
    },
    {
      name: "Mars",
      type: "Planet", 
      constellation: "Gemini",
      magnitude: 0.8,
      visibility: "Good",
      description: "Red planet visible in the early hours"
    },
    {
      name: "Orion Nebula",
      type: "Nebula",
      constellation: "Orion",
      magnitude: 4.0,
      visibility: "Fair",
      description: "Star-forming region visible with binoculars"
    },
    {
      name: "Sirius",
      type: "Star",
      constellation: "Canis Major",
      magnitude: -1.4,
      visibility: "Excellent",
      description: "Brightest star in the night sky"
    }
  ];

  useEffect(() => {
    if (open) {
      getLocation();
    }
  }, [open]);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          fetchSkyData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log('Location error:', error);
          // Use dummy data if geolocation fails
          setSkyData(fallbackData);
          setLoading(false);
        }
      );
    } else {
      setSkyData(fallbackData);
      setLoading(false);
    }
  };

  const fetchSkyData = async (lat: number, lon: number) => {
    try {
      // For now, use dummy data as API integration would require backend
      // In production, you'd call your backend API which fetches from astronomy APIs
      setTimeout(() => {
        setSkyData(fallbackData);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching sky data:', error);
      setSkyData(fallbackData);
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'planet': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'star': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'nebula': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility.toLowerCase()) {
      case 'excellent': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'good': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'fair': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900/95 border-purple-500/30 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sky Tonight
          </DialogTitle>
          <DialogDescription className="text-gray-300 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {location ? `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}` : 'Location not available'}
            <Clock className="w-4 h-4 ml-4" />
            {new Date().toLocaleTimeString()}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            <span className="ml-2 text-gray-300">Loading sky data...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skyData.map((object, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-sm border-purple-500/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-white">{object.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(object.type)}>{object.type}</Badge>
                        <Badge className={getVisibilityColor(object.visibility)}>{object.visibility}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-300">
                      {object.constellation} • Magnitude: {object.magnitude}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-3">{object.description}</p>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center pt-4">
              <Button 
                onClick={getLocation}
                variant="outline" 
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              >
                Refresh Sky Data
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SkyTonight;
