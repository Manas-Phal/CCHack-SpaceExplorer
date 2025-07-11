
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, Globe, Orbit, Zap } from 'lucide-react';

const celestialData = [
  {
    id: 1,
    name: 'Andromeda Galaxy',
    type: 'Galaxy',
    description: 'The nearest major galaxy to the Milky Way, containing over one trillion stars.',
    coordinates: 'RA 00h 42m 44s, Dec +41° 16\' 09"',
    magnitude: 3.4,
    distance: '2.537 million light-years'
  },
  {
    id: 2,
    name: 'Orion Nebula',
    type: 'Nebula',
    description: 'A stellar nursery where new stars are born, visible to the naked eye.',
    coordinates: 'RA 05h 35m 17s, Dec -05° 23\' 14"',
    magnitude: 4.0,
    distance: '1,344 light-years'
  },
  {
    id: 3,
    name: 'Saturn',
    type: 'Planet',
    description: 'The ringed planet, sixth from the Sun in our solar system.',
    coordinates: 'RA 20h 15m 32s, Dec -20° 45\' 18"',
    magnitude: 0.2,
    distance: '746 million miles'
  },
  {
    id: 4,
    name: 'Betelgeuse',
    type: 'Star',
    description: 'A red supergiant star in the constellation Orion, one of the largest known stars.',
    coordinates: 'RA 05h 55m 10s, Dec +07° 24\' 25"',
    magnitude: 0.5,
    distance: '642.5 light-years'
  },
  {
    id: 5,
    name: 'Crab Nebula',
    type: 'Nebula',
    description: 'The remnant of a supernova explosion observed by Chinese astronomers in 1054 AD.',
    coordinates: 'RA 05h 34m 32s, Dec +22° 00\' 52"',
    magnitude: 8.4,
    distance: '6,500 light-years'
  },
  {
    id: 6,
    name: 'Jupiter',
    type: 'Planet',
    description: 'The largest planet in our solar system, known for its Great Red Spot.',
    coordinates: 'RA 02h 45m 18s, Dec +14° 32\' 06"',
    magnitude: -2.5,
    distance: '390 million miles'
  }
];

const CelestialObjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedObject, setSelectedObject] = useState<any>(null);

  const filteredObjects = celestialData.filter((obj) => {
    const matchesSearch = obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || obj.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'galaxy': return <Orbit className="w-4 h-4" />;
      case 'nebula': return <Zap className="w-4 h-4" />;
      case 'planet': return <Globe className="w-4 h-4" />;
      case 'star': return <Star className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'galaxy': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'nebula': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'planet': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'star': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search celestial objects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-black/30 border-purple-500/30 text-white placeholder-gray-400"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-48 bg-black/30 border-purple-500/30 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-purple-500/30">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="galaxy">Galaxies</SelectItem>
            <SelectItem value="nebula">Nebulae</SelectItem>
            <SelectItem value="planet">Planets</SelectItem>
            <SelectItem value="star">Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Objects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredObjects.map((object) => (
          <Card 
            key={object.id} 
            className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer group hover:scale-105"
            onClick={() => setSelectedObject(object)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white group-hover:text-purple-300 transition-colors">
                  {object.name}
                </CardTitle>
                <Badge className={getTypeColor(object.type)}>
                  {getTypeIcon(object.type)}
                  <span className="ml-1">{object.type}</span>
                </Badge>
              </div>
              <CardDescription className="text-gray-300">
                {object.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Magnitude:</span>
                  <span className="text-white">{object.magnitude}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Distance:</span>
                  <span className="text-white">{object.distance}</span>
                </div>
                <div className="text-xs text-gray-500 mt-3">
                  {object.coordinates}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedObject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-slate-900/95 border-purple-500/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">{selectedObject.name}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedObject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
              <Badge className={getTypeColor(selectedObject.type)} style={{ width: 'fit-content' }}>
                {getTypeIcon(selectedObject.type)}
                <span className="ml-1">{selectedObject.type}</span>
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-lg">{selectedObject.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Coordinates</h4>
                  <p className="text-sm text-gray-300">{selectedObject.coordinates}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Magnitude</h4>
                  <p className="text-sm text-gray-300">{selectedObject.magnitude}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Distance</h4>
                  <p className="text-sm text-gray-300">{selectedObject.distance}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Track Object
                </Button>
                <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                  Add to Favorites
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CelestialObjects;
