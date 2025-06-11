import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FavoriteButton from './FavoriteButton';

export default function TeamCard({ team, onPress }) {
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.card}>
      <FavoriteButton teamId={team.id.toString()} style={styles.favoriteButton} />
      <TouchableOpacity style={styles.touchableArea} onPress={onPress}>
        {!imageError ? (
          <Image
            source={{ uri: team.logo }}
            style={styles.logo}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={[styles.logo, styles.logoFallback]}>
            <Text style={styles.logoText}>{team.abbreviation || 'N/A'}</Text>
          </View>
        )}
        <Text style={styles.name}>{team.full_name}</Text>
        <Text style={styles.city}>{team.city}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '45%',
    position: 'relative',
  },
  touchableArea: {
    alignItems: 'center',
    width: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFallback: {
    backgroundColor: '#1d428a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  city: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
});
