
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Camera, Save, Plus, Eye } from 'lucide-react';

const ObservationTracker = () => {
  const [observations, setObservations] = useState([
    {
      id: 1,
      name: 'Jupiter with Moons',
      date: '2024-12-01',
      time: '21:30',
      coordinates: 'RA 02h 45m, Dec +14° 32\'',
      object: 'Planet',
      notes: 'Clear view of four Galilean moons through 8" telescope. Great Red Spot visible!',
      weather: 'Clear',
      seeing: 'Excellent'
    },
    {
      id: 2,
      name: 'Orion Nebula',
      date: '2024-11-28',
      time: '23:15',
      coordinates: 'RA 05h 35m, Dec -05° 23\'',
      object: 'Nebula',
      notes: 'Beautiful trapezium cluster visible. Used OIII filter for better contrast.',
      weather: 'Partly Cloudy',
      seeing: 'Good'
    }
  ]);

  const [newObservation, setNewObservation] = useState({
    name: '',
    date: '',
    time: '',
    coordinates: '',
    object: '',
    notes: '',
    weather: '',
    seeing: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setNewObservation(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newObservation.name && newObservation.date) {
      const observation = {
        ...newObservation,
        id: observations.length + 1
      };
      setObservations(prev => [observation, ...prev]);
      setNewObservation({
        name: '',
        date: '',
        time: '',
        coordinates: '',
        object: '',
        notes: '',
        weather: '',
        seeing: ''
      });
      setShowForm(false);
    }
  };

  const getObjectColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'planet': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'nebula': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'galaxy': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'star': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getSeeingColor = (seeing: string) => {
    switch (seeing.toLowerCase()) {
      case 'excellent': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'good': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'fair': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'poor': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Observation Log
          </h2>
          <p className="text-gray-300">Track your celestial observations</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Observation
        </Button>
      </div>

      {/* New Observation Form */}
      {showForm && (
        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Camera className="w-5 h-5" />
              New Observation
            </CardTitle>
            <CardDescription>Record your celestial observation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Object Name</Label>
                  <Input
                    id="name"
                    value={newObservation.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Jupiter, Andromeda Galaxy"
                    className="bg-black/30 border-purple-500/30 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="object" className="text-white">Object Type</Label>
                  <Select value={newObservation.object} onValueChange={(value) => handleInputChange('object', value)}>
                    <SelectTrigger className="bg-black/30 border-purple-500/30 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/30">
                      <SelectItem value="planet">Planet</SelectItem>
                      <SelectItem value="star">Star</SelectItem>
                      <SelectItem value="nebula">Nebula</SelectItem>
                      <SelectItem value="galaxy">Galaxy</SelectItem>
                      <SelectItem value="cluster">Star Cluster</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newObservation.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="bg-black/30 border-purple-500/30 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newObservation.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="bg-black/30 border-purple-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coordinates" className="text-white">Coordinates (RA/Dec)</Label>
                  <Input
                    id="coordinates"
                    value={newObservation.coordinates}
                    onChange={(e) => handleInputChange('coordinates', e.target.value)}
                    placeholder="e.g., RA 05h 35m, Dec -05° 23'"
                    className="bg-black/30 border-purple-500/30 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seeing" className="text-white">Seeing Conditions</Label>
                  <Select value={newObservation.seeing} onValueChange={(value) => handleInputChange('seeing', value)}>
                    <SelectTrigger className="bg-black/30 border-purple-500/30 text-white">
                      <SelectValue placeholder="Select seeing" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/30">
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">Observation Notes</Label>
                <Textarea
                  id="notes"
                  value={newObservation.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Describe what you observed, equipment used, notable features..."
                  rows={3}
                  className="bg-black/30 border-purple-500/30 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Observation
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Observation History */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Recent Observations</h3>
        {observations.map((obs) => (
          <Card key={obs.id} className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {obs.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {obs.date} at {obs.time}
                    </span>
                    {obs.coordinates && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {obs.coordinates}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {obs.object && <Badge className={getObjectColor(obs.object)}>{obs.object}</Badge>}
                  {obs.seeing && <Badge className={getSeeingColor(obs.seeing)}>{obs.seeing}</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{obs.notes}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObservationTracker;
