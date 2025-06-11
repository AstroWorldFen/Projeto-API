import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { login, register } from '../services/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    if (!email || !password || (isRegistering && !name)) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigation.navigate('Main');
    } catch (err) {
      let errorMessage = 'Erro na autenticação';
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email já está cadastrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'Senha deve ter pelo menos 6 caracteres';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta';
          break;
        default:
          errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NBA Conferência Oeste</Text>
      
      {isRegistering && (
        <TextInput
          placeholder="Nome de usuário"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      
      {isRegistering && (
        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
      )}
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button 
          title={isRegistering ? "Registrar" : "Entrar"} 
          onPress={handleAuth} 
          color="#1d428a" 
        />
      )}
      
      <TouchableOpacity 
        style={styles.switchButton}
        onPress={() => setIsRegistering(!isRegistering)}
      >
        <Text style={styles.switchText}>
          {isRegistering 
            ? "Já tem uma conta? Faça login" 
            : "Não tem uma conta? Registre-se"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1d428a'
  },
  input: {
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center'
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center'
  },
  switchText: {
    color: '#1d428a',
    fontSize: 16
  }
});
