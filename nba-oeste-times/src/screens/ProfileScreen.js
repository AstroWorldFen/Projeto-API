import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { auth, getUserFavorites } from '../services/firebase';
import { updateProfile } from 'firebase/auth';

export default function ProfileScreen() {
  const [name, setName] = useState(auth.currentUser?.displayName || '');
  const [email, setEmail] = useState(auth.currentUser?.email || '');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const loadFavoritesCount = async () => {
      if (auth.currentUser) {
        const favs = await getUserFavorites(auth.currentUser.uid);
        setFavoritesCount(favs.length);
      }
    };
    loadFavoritesCount();
  }, []);

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setName(newName);
      setNewName('');
      Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o nome.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.info}>{name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{email}</Text>

      <Text style={styles.label}>Favoritos:</Text>
      <Text style={styles.info}>{favoritesCount}</Text>

      <Text style={styles.editLabel}>Editar nome:</Text>
      <TextInput
        placeholder="Novo nome"
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
      />
      <Button title="Salvar" onPress={handleUpdateName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    marginBottom: 5
  },
  editLabel: {
    fontSize: 16,
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 5
  }
});
