import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Importar el hook

export default function ProfileScreen() {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario
  const isFocused = useIsFocused(); // Hook para saber si la pantalla está enfocada

  // Función para recuperar el perfil del usuario
  const fetchUserProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Guardar los datos del usuario
      } else {
        setUser(null); // Reiniciar el estado del usuario si no hay datos
      }
    } catch (error) {
      console.error('Error al recuperar la información del usuario:', error);
      setUser(null); // Asegúrate de reiniciar el estado en caso de error
    }
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Limpiar todo el AsyncStorage
      setUser(null); // Reiniciar el estado del usuario
      router.push('/login'); // Redirigir al usuario a la pantalla de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchUserProfile(); // Recuperar la información del usuario solo si está enfocado
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {user ? (
        <>
          {/* Mostrar la imagen de perfil */}
          {user.profileImage && (
            <Image
              source={{ uri: user.profileImage }} // Usar la URL de la imagen de perfil
              style={styles.profileImage}
              resizeMode="cover" // Asegúrate de ajustar la imagen al contenedor
            />
          )}
          <Text style={styles.label}>Nombre de usuario: {user.username}</Text>
          <Text style={styles.label}>Email: {user.email}</Text>
          <Button title="Cerrar sesión" onPress={handleLogout} color="#ff0000" /> {/* Botón para cerrar sesión */}
        </>
      ) : (
        <Text style={styles.loading}>Cargando perfil...</Text> // Mensaje mientras se carga la información
      )}
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
    textAlign: 'center',
  },
  profileImage: {
    width: 100, // Ancho de la imagen de perfil
    height: 100, // Alto de la imagen de perfil
    borderRadius: 50, // Hacer la imagen circular
    alignSelf: 'center', // Centrar la imagen
    marginBottom: 20, // Espacio debajo de la imagen
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});
