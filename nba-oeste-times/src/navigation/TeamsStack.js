import { createStackNavigator } from '@react-navigation/stack';
import TeamsScreen from '../screens/TeamsScreen';
import TeamDetailsScreen from '../screens/TeamDetailsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function TeamsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1d428a',
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="TeamsList" 
        component={TeamsScreen} 
        options={{ 
          title: 'Times da Conferência Oeste',
          headerLeft: ({ onPress }) => (
            <Icon 
              name="menu" 
              size={25} 
              color="#fff" 
              style={{ marginLeft: 15 }}
              onPress={onPress}
            />
          )
        }}
      />
      <Stack.Screen 
        name="TeamDetails" 
        component={TeamDetailsScreen} 
        options={({ route }) => ({ 
          title: route.params.team.full_name,
          headerBackTitle: 'Voltar'
        })}
      />
    </Stack.Navigator>
  );
}