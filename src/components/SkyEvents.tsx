
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Zap, Moon, Sun, Orbit } from 'lucide-react';

const skyEvents = [
  {
    id: 1,
    title: 'Geminids Meteor Shower Peak',
    type: 'Meteor Shower',
    date: '2024-12-14',
    time: '02:00 AM',
    description: 'One of the best meteor showers of the year with up to 120 meteors per hour.',
    visibility: 'Worldwide',
    magnitude: 'Excellent',
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 2,
    title: 'Total Lunar Eclipse',
    type: 'Eclipse',
    date: '2024-12-31',
    time: '11:30 PM',
    description: 'The Moon will turn a deep red color during this spectacular total lunar eclipse.',
    visibility: 'Americas, Europe, Africa',
    magnitude: 'Total',
    icon: <Moon className="w-4 h-4" />
  },
  {
    id: 3,
    title: 'Jupiter at Opposition',
    type: 'Planetary',
    date: '2024-12-07',
    time: '09:00 PM',
    description: 'Jupiter will be at its closest approach to Earth and fully illuminated.',
    visibility: 'Worldwide',
    magnitude: '-2.8',
    icon: <Orbit className="w-4 h-4" />
  },
  {
    id: 4,
    title: 'Quadrantids Meteor Shower',
    type: 'Meteor Shower',
    date: '2025-01-04',
    time: '03:00 AM',
    description: 'The first major meteor shower of the year with a short but intense peak.',
    visibility: 'Northern Hemisphere',
    magnitude: 'Good',
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 5,
    title: 'Venus at Greatest Elongation',
    type: 'Planetary',
    date: '2025-01-10',
    time: '06:30 AM',
    description: 'Venus will be at its highest point above the horizon in the morning sky.',
    visibility: 'Worldwide',
    magnitude: '-4.5',
    icon: <Sun className="w-4 h-4" />
  }
];

const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'meteor shower': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case 'eclipse': return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 'planetary': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    default: return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const isUpcoming = (dateString: string) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  return eventDate >= today;
};

const SkyEvents = () => {
  const upcomingEvents = skyEvents.filter(event => isUpcoming(event.date));

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Upcoming Sky Events
        </h2>
        <p className="text-gray-300">Don't miss these spectacular celestial events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingEvents.map((event) => (
          <Card 
            key={event.id} 
            className="bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group hover:scale-[1.02]"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                    {event.icon}
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-2">
                    {event.description}
                  </CardDescription>
                </div>
                <Badge className={getEventTypeColor(event.type)}>
                  {event.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{event.visibility}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-yellow-400">★</span>
                  <span>{event.magnitude}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Set Reminder
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {upcomingEvents.length === 0 && (
        <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20 text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No upcoming events</p>
              <p className="text-sm">Check back later for new celestial events</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkyEvents;
