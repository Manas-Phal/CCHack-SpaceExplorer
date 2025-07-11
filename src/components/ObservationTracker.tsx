
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, MapPin, Calendar, Star, Save, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { useToast } from '../hooks/use-toast';
import LoadingSpinner from './LoadingSpinner';
import ObservationStats from './ObservationStats';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore();

const addDocument = async (collectionName: string, data: any) => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
};

const getDocuments = async (collectionName: string): Promise<Observation[]> => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Observation)
  }));
};


const deleteDocument = async (collectionName: string, docId: string) => {
  await deleteDoc(doc(db, collectionName, docId));
};


interface Observation {
  id?: string;
  userId?: string;
  title: string;
  date: string;
  time: string;
  coordinates: {
    ra: string;
    dec: string;
  };
  location: string;
  notes: string;
  imageUrl?: string;
  objectType: string;
  equipment: string;
  conditions: string;
  createdAt?: any;
}

const ObservationTracker = () => {
  const { user } = useAuth();
  const { addObservation, loading: isLoadingFromHook } = useFirestore(); 
  const { toast } = useToast();

  const [observations, setObservations] = useState<Observation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState<Observation>({
    title: '',
    date: '',
    time: '',
    coordinates: { ra: '', dec: '' },
    location: '',
    notes: '',
    objectType: '',
    equipment: '',
    conditions: ''
  });

  // Load observations
  React.useEffect(() => {
    if (user) {
      loadObservations();
    }
  }, [user]);

  const loadObservations = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const allDocs = await getDocuments('observations');
      const docs = allDocs.filter(doc => doc.userId === user.uid);

      setObservations(docs);
    } catch (error) {
      console.error('Error loading observations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof typeof prev], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.title || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title and date for your observation.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await addDocument('observations', {
        ...formData,
        userId: user.uid,
        createdAt: new Date()
      });

      toast({
        title: "Observation Saved!",
        description: "Your astronomical observation has been recorded successfully.",
      });

      // Reset form
      setFormData({
        title: '',
        date: '',
        time: '',
        coordinates: { ra: '', dec: '' },
        location: '',
        notes: '',
        objectType: '',
        equipment: '',
        conditions: ''
      });

      loadObservations();
    } catch (error) {
      console.error('Error saving observation:', error);
      toast({
        title: "Error",
        description: "Failed to save observation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument('observations', id);
      toast({
        title: "Observation Deleted",
        description: "The observation has been removed from your log.",
      });
      loadObservations();
    } catch (error) {
      console.error('Error deleting observation:', error);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      // In a real app, you'd upload to Firebase Storage
      toast({
        title: "Image Ready",
        description: `${imageFile.name} is ready to upload with your observation.`,
      });
    }
  }, [toast]);

  if (!user) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20 text-center py-12">
        <CardContent>
          <div className="text-gray-400 mb-4">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Sign in to track your observations</p>
            <p className="text-sm">Keep a detailed log of your astronomical discoveries</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Observation Tracker
        </h2>
        <p className="text-gray-300">Record and manage your astronomical observations</p>
      </div>

      {/* Stats Card */}
      <ObservationStats 
        totalObservations={observations.length}
        uniqueObjects={new Set(observations.map(obs => obs.objectType)).size}
        currentStreak={7} // This would be calculated based on observation dates
        level={Math.floor(observations.length / 10) + 1}
      />

      {/* New Observation Form */}
      <Card className="glassmorphism hover-glow transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-purple-400" />
            New Observation
          </CardTitle>
          <CardDescription className="text-gray-300">
            Record details about your latest astronomical observation
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Object/Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Jupiter through 8-inch telescope"
                  className="bg-black/40 border-purple-500/30 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Object Type
                </label>
                <Input
                  name="objectType"
                  value={formData.objectType}
                  onChange={handleInputChange}
                  placeholder="e.g., Planet, Galaxy, Nebula"
                  className="bg-black/40 border-purple-500/30 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date *
                </label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-black/40 border-purple-500/30 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time
                </label>
                <Input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="bg-black/40 border-purple-500/30 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Right Ascension (RA)
                </label>
                <Input
                  name="coordinates.ra"
                  value={formData.coordinates.ra}
                  onChange={handleInputChange}
                  placeholder="e.g., 12h 30m 45s"
                  className="bg-black/40 border-purple-500/30 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Declination (DEC)
                </label>
                <Input>
                  name="coordinates.dec"
                  value={formData.coordinates.dec}
                  onChange={handleInputChange}
                  placeholder="e.g., +41° 16' 09\"
                  className="bg-black/40 border-purple-500/30 text-white"
                </Input>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Backyard, Observatory"
                  className="bg-black/40 border-purple-500/30 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Equipment Used
                </label>
                <Input
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleInputChange}
                  placeholder="e.g., 8-inch Dobsonian, DSLR"
                  className="bg-black/40 border-purple-500/30 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Observing Conditions
              </label>
              <Input
                name="conditions"
                value={formData.conditions}
                onChange={handleInputChange}
                placeholder="e.g., Clear skies, minimal light pollution"
                className="bg-black/40 border-purple-500/30 text-white"
              />
            </div>

            {/* Image Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-purple-400 bg-purple-500/10' 
                  : 'border-purple-500/30 hover:border-purple-500/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <p className="text-gray-300 mb-2">Drag and drop an image, or click to browse</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notes & Observations
              </label>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Describe what you observed, any interesting features, sketches, etc..."
                className="bg-black/40 border-purple-500/30 text-white min-h-[100px]"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Observation
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Observation History */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-400" />
          Your Observations ({observations.length})
        </h3>

        {isLoading && (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 mt-4">Loading your observations...</p>
          </div>
        )}

        {!isLoading && observations.length === 0 && (
          <Card className="bg-black/40 backdrop-blur-sm border-purple-500/20 text-center py-8">
            <CardContent>
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-400 opacity-50" />
              <p className="text-gray-400">No observations recorded yet</p>
              <p className="text-sm text-gray-500">Start by adding your first observation above</p>
            </CardContent>
          </Card>
        )}

        {!isLoading && observations.map((observation, index) => (
          <Card 
            key={observation.id || index}
            className="glassmorphism hover-glow animate-fade-in transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {observation.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {observation.date} {observation.time && `at ${observation.time}`}
                    </span>
                    {observation.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {observation.location}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {observation.objectType && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {observation.objectType}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(observation.id!)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {(observation.coordinates.ra || observation.coordinates.dec) && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {observation.coordinates.ra && (
                    <div className="text-gray-400">
                      <span className="block font-medium text-white">RA:</span>
                      {observation.coordinates.ra}
                    </div>
                  )}
                  {observation.coordinates.dec && (
                    <div className="text-gray-400">
                      <span className="block font-medium text-white">DEC:</span>
                      {observation.coordinates.dec}
                    </div>
                  )}
                </div>
              )}
              
              {observation.equipment && (
                <div className="text-sm">
                  <span className="font-medium text-white">Equipment: </span>
                  <span className="text-gray-300">{observation.equipment}</span>
                </div>
              )}
              
              {observation.conditions && (
                <div className="text-sm">
                  <span className="font-medium text-white">Conditions: </span>
                  <span className="text-gray-300">{observation.conditions}</span>
                </div>
              )}
              
              {observation.notes && (
                <div className="text-sm">
                  <span className="font-medium text-white">Notes: </span>
                  <p className="text-gray-300 mt-1 leading-relaxed">{observation.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObservationTracker;
