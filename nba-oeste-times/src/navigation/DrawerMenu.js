import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { auth } from '../services/firebase';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DrawerMenu({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NBA West Teams</Text>
      </View>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Times')}
      >
        <Icon name="basketball-outline" size={22} style={styles.icon} />
        <Text style={styles.label}>Times</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Icon name="person-outline" size={22} style={styles.icon} />
        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={handleLogout}
      >
        <Icon name="log-out-outline" size={22} style={styles.icon} />
        <Text style={styles.label}>Sair</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    padding: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
    marginBottom: 10
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  drawerItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  icon: { 
    marginRight: 15, 
    width: 24,
    textAlign: 'center'
  },
  label: { fontSize: 16 }
});