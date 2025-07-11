
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Star, Moon, Sun, Orbit, Zap, Eye } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const celestialObjects = [
  {
    id: 1,
    name: 'Andromeda Galaxy',
    type: 'Galaxy',
    distance: '2.537 million ly',
    magnitude: 3.4,
    constellation: 'Andromeda',
    description: 'The nearest major galaxy to the Milky Way and the most distant object visible to the naked eye.',
    coordinates: { ra: '00h 42m 44s', dec: '+41° 16\' 09"' },
    bestViewing: 'October - February',
    icon: <Orbit className="w-4 h-4" />
  },
  {
    id: 2,
    name: 'Orion Nebula',
    type: 'Nebula',
    distance: '1,344 ly',
    magnitude: 4.0,
    constellation: 'Orion',
    description: 'A stellar nursery where new stars are being born, visible as a fuzzy patch in Orion\'s sword.',
    coordinates: { ra: '05h 35m 17s', dec: '-05° 23\' 14"' },
    bestViewing: 'December - March',
    icon: <Star className="w-4 h-4" />
  },
  {
    id: 3,
    name: 'Saturn',
    type: 'Planet',
    distance: '746 million miles',
    magnitude: 0.7,
    constellation: 'Varies',
    description: 'The ringed planet, famous for its spectacular ring system visible through small telescopes.',
    coordinates: { ra: 'Variable', dec: 'Variable' },
    bestViewing: 'Year-round',
    icon: <Sun className="w-4 h-4" />
  },
  {
    id: 4,
    name: 'Pleiades',
    type: 'Star Cluster',
    distance: '444 ly',
    magnitude: 1.6,
    constellation: 'Taurus',
    description: 'Also known as the Seven Sisters, this open star cluster is easily visible to the naked eye.',
    coordinates: { ra: '03h 47m 29s', dec: '+24° 07\' 00"' },
    bestViewing: 'November - April',
    icon: <Star className="w-4 h-4" />
  },
  {
    id: 5,
    name: 'Jupiter',
    type: 'Planet',
    distance: '390 million miles',
    magnitude: -2.2,
    constellation: 'Varies',
    description: 'The largest planet in our solar system, with four major moons visible through binoculars.',
    coordinates: { ra: 'Variable', dec: 'Variable' },
    bestViewing: 'Year-round',
    icon: <Sun className="w-4 h-4" />
  },
  {
    id: 6,
    name: 'Ring Nebula',
    type: 'Nebula',
    distance: '2,300 ly',
    magnitude: 8.8,
    constellation: 'Lyra',
    description: 'A planetary nebula that looks like a cosmic donut through a telescope.',
    coordinates: { ra: '18h 53m 35s', dec: '+33° 01\' 45"' },
    bestViewing: 'June - October',
    icon: <Orbit className="w-4 h-4" />
  }
];

const objectTypes = ['All', 'Galaxy', 'Nebula', 'Planet', 'Star Cluster'];

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'galaxy': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'nebula': return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
    case 'planet': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'star cluster': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
};

const CelestialObjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedObject, setSelectedObject] = useState<number | null>(null);

  const filteredObjects = celestialObjects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obj.constellation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || obj.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearchTerm(value);
    // Simulate API delay
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-glow">
          Celestial Objects Database
        </h2>
        <p className="text-gray-300">Explore the wonders of our universe</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search celestial objects..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-black/40 border-purple-500/30 text-white placeholder-gray-400 focus:border-purple-500"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap justify-center">
          {objectTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={`transition-all duration-300 ${
                selectedType === type 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'border-purple-500/50 text-purple-300 hover:bg-purple-500/20'
              }`}
            >
              <Filter className="w-3 h-3 mr-1" />
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-black/40 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Objects Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredObjects.map((object, index) => (
            <Card 
              key={object.id}
              className={`bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer hover-scale hover-glow animate-fade-in animate-stagger-${Math.min(index + 1, 4)}`}
              onClick={() => setSelectedObject(selectedObject === object.id ? null : object.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white flex items-center gap-2 hover:text-purple-300 transition-colors">
                      {object.icon}
                      {object.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 mt-1">
                      {object.constellation} • {object.distance}
                    </CardDescription>
                  </div>
                  <Badge className={getTypeColor(object.type)}>
                    {object.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {object.description}
                </p>

                {selectedObject === object.id && (
                  <div className="space-y-3 pt-3 border-t border-purple-500/20 animate-slide-up">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="text-gray-400">
                        <span className="block font-medium text-white">Right Ascension</span>
                        {object.coordinates.ra}
                      </div>
                      <div className="text-gray-400">
                        <span className="block font-medium text-white">Declination</span>
                        {object.coordinates.dec}
                      </div>
                      <div className="text-gray-400">
                        <span className="block font-medium text-white">Magnitude</span>
                        {object.magnitude}
                      </div>
                      <div className="text-gray-400">
                        <span className="block font-medium text-white">Best Viewing</span>
                        {object.bestViewing}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Track Object
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 transition-all duration-300"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && filteredObjects.length === 0 && (
        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20 text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No objects found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CelestialObjects;
