import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toggleFavorite, getUserFavorites, auth } from '../services/firebase';

export default function FavoriteButton({ teamId, style }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (auth.currentUser) {
        const favorites = await getUserFavorites(auth.currentUser.uid);
        setIsFavorite(favorites.includes(teamId));
      }
    };
    checkFavorite();
  }, [teamId]);

  const handleToggle = async () => {
    if (!auth.currentUser) return;
    const result = await toggleFavorite(auth.currentUser.uid, teamId);
    setIsFavorite(result);
  };

  return (
    <TouchableOpacity onPress={handleToggle} style={style}>
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={isFavorite ? 'red' : 'black'}
      />
    </TouchableOpacity>
  );
}
