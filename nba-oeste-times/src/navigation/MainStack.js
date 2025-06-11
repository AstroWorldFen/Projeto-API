import { createDrawerNavigator } from '@react-navigation/drawer';
import TeamsStack from './TeamsStack';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerMenu from './DrawerMenu';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default function MainStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#1d428a',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen 
        name="Times" 
        component={TeamsStack} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="basketball-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}