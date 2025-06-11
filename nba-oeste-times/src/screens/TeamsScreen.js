import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, Switch, StyleSheet } from 'react-native';
import TeamCard from '../components/TeamCard';
import useTeams from '../hooks/useTeams';
import { getUserFavorites, auth } from '../services/firebase';

export default function TeamsScreen({ navigation }) {
  const { teams, loading, error } = useTeams();
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favLoading, setFavLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (auth.currentUser) {
        try {
          const favs = await getUserFavorites(auth.currentUser.uid);
          setFavorites(favs);
        } catch (err) {
          console.error(err);
        }
      }
      setFavLoading(false);
    };
    loadFavorites();
  }, [favoritesOnly]);

  if (loading || favLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erro ao carregar times: {error}</Text>
      </View>
    );
  }

  const filteredTeams = favoritesOnly
    ? teams.filter(team => favorites.includes(team.id.toString()))
    : teams;

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Mostrar apenas favoritos</Text>
        <Switch
          value={favoritesOnly}
          onValueChange={setFavoritesOnly}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={favoritesOnly ? '#1d428a' : '#f4f3f4'}
        />
      </View>
      <FlatList
        data={filteredTeams}
        renderItem={({ item }) => (
          <TeamCard
            team={item}
            onPress={() => navigation.navigate('TeamDetails', { team: item })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {favoritesOnly ? 'Você não tem times favoritos' : 'Nenhum time encontrado'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    margin: 10,
    elevation: 2
  },
  filterText: {
    fontSize: 16
  },
  list: {
    padding: 10
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 20
  }
});
