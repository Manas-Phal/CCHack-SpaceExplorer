
import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';

export interface Observation {
  id?: string;
  userId: string;
  name: string;
  date: string;
  time: string;
  coordinates: string;
  object: string;
  notes: string;
  weather: string;
  seeing: string;
  imageUrl?: string;
  createdAt: Date;
}

export const useFirestore = () => {
  const { user } = useAuth();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setObservations([]);
      return;
    }

    const q = query(
      collection(db, 'observations'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const observationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Observation[];
      setObservations(observationsData);
    });

    return unsubscribe;
  }, [user]);

  const addObservation = async (observationData: Omit<Observation, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) throw new Error('User must be authenticated');

    setLoading(true);
    try {
      await addDoc(collection(db, 'observations'), {
        ...observationData,
        userId: user.uid,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error adding observation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    observations,
    addObservation,
    loading
  };
};
