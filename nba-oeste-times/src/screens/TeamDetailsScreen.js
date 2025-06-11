import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import teamInfo from '../data/teamInfo';
import teamStats from '../data/teamStats';

export default function TeamDetailsScreen({ route }) {
  const { team } = route.params;

  const info = teamInfo[team.id];
  const stats = teamStats[team.id];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{team.full_name}</Text>

      {info && (
        <>
          <Image source={{ uri: info.logo }} style={styles.logo} />
          <Text style={styles.description}>{info.history}</Text>
          <Text style={styles.subTitle}>Jogadores-chave:</Text>
          {info.keyPlayers.map((player, index) => (
            <Text key={index} style={styles.listItem}>- {player}</Text>
          ))}
        </>
      )}

      {stats ? (
        <>
          <Text style={styles.subTitle}>Estatísticas da Temporada:</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>PPG: {stats.ppg}</Text>
            <Text style={styles.statsText}>RPG: {stats.rpg}</Text>
            <Text style={styles.statsText}>APG: {stats.apg}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>FG%: {stats.fg_pct ? (stats.fg_pct * 100).toFixed(1) + '%' : 'N/A'}</Text>
            <Text style={styles.statsText}>3P%: {stats.fg3_pct ? (stats.fg3_pct * 100).toFixed(1) + '%' : 'N/A'}</Text>
            <Text style={styles.statsText}>MIN: {stats.min}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.warning}>Nenhuma estatística disponível.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  warning: {
    marginTop: 16,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
