import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import users from '../../data/users.json'; // Asegúrate de que la ruta es correcta
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { useRouter } from 'expo-router'; // Usa el hook de Expo Router

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para mensajes
  const router = useRouter(); // Hook para la navegación

  const handleLogin = async () => {
    const user = users.find((u) => u.username === username && u.password === password);
    
    if (user) {
      // Almacenar el usuario en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      // Mostrar mensaje de acceso correcto
      setMessage('Acceso correcto');
      
      // Después de medio segundo, redirigir a la pantalla de perfil y borrar el mensaje
      setTimeout(() => {
        setMessage('');
        // Navegar a la pantalla de perfil (asegúrate de que la ruta sea correcta)
        router.push('/(tabs)/profile');
      }, 500);
      
      // Limpiar los campos de entrada
      setUsername('');
      setPassword('');
    } else {
      // Mostrar mensaje de error
      setMessage('Acceso incorrecto. Por favor, verifica tu usuario y contraseña.');
      
      // Mostrar la alerta de error
      Alert.alert('Login Failed', 'Invalid username or password');
      
      // Después de medio segundo, ocultar el mensaje
      setTimeout(() => {
        setMessage('');
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <Text style={styles.label}>Nombre de usuario:</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <Button title="Login" onPress={handleLogin} />
      
      {/* Mostrar mensaje de acceso o error */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4, // Espacio entre la etiqueta y el campo de entrada
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: 'blue', // Color del mensaje (puedes cambiarlo si deseas)
  },
});
