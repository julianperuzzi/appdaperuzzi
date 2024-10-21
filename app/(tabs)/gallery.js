import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = [
  { id: 1, uri: 'https://images.pexels.com/photos/885021/pexels-photo-885021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', text: 'Montañas' },
  { id: 2, uri: 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', text: 'Lago' },
  { id: 3, uri: 'https://images.pexels.com/photos/333523/pexels-photo-333523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', text: 'Paisaje urbano' },
  // ...agrega más imágenes según sea necesario
];

export default function GalleryScreen() {
  const [username, setUsername] = useState(null);
  const [activeImage, setActiveImage] = useState(null); // Estado para la imagen activa

  const checkUserSession = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.username);
      } else {
        setUsername(null);
      }
    } catch (error) {
      console.error('Error al recuperar el usuario:', error);
    }
  };

  useEffect(() => {
    checkUserSession();
    const interval = setInterval(() => {
      checkUserSession(); 
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Galería</Text>
      {username && <Text style={styles.welcomeMessage}>Bienvenido, {username}!</Text>}
      {images.map((image) => (
        <TouchableOpacity
          key={image.id}
          style={styles.imageContainer}
          onPressIn={() => setActiveImage(image.id)} // Activar cuando se presione la imagen
          onPressOut={() => setActiveImage(null)} // Desactivar cuando se suelte la imagen
        >
          <Image source={{ uri: image.uri }} style={styles.image} />
          {activeImage === image.id && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>{image.text}</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255, 0.5)', // Color negro con un poco de transparencia
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  overlayText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex:30,
  },
});
