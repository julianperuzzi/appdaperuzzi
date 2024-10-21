import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router'; // Asegúrate de importar el hook para la navegación

export default function HomeScreen() {
  const router = useRouter(); // Hook para la navegación

  return (
    <ImageBackground 
      source={{ uri: 'https://images.pexels.com/photos/7130466/pexels-photo-7130466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} // Cambia esta URL por tu imagen de fondo
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>App Desarrollo de Aplicativos</Text>
        
       
        
        <Text style={styles.description}>
        Bienvenido a la Pantalla de Inicio!
        </Text>

        
        <View style={styles.buttonContainer}>
          <Button title="Galería" onPress={() => router.push('/(tabs)/gallery')} />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => router.push('/(tabs)/login')} />
        </View>

        <Text style={styles.alumno}>
        Alumno: Julian Peruzzi
        </Text>
        
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Centra los elementos verticalmente
    alignItems: 'center', // Centra los elementos horizontalmente
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    padding: 30,
    borderRadius: 10,
    margin: 8,
    alignItems: 'center', // Centra los elementos dentro del contenedor
    shadowColor: '#000', // Sombra para dar profundidad
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Sombra en Android
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Color del texto
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left', 
    color: '#555', // Color del texto
   
  },
  alumno: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'left', 
    color: '#555', // Color del texto
   
  },
  buttonContainer: {
    marginVertical: 10, // Espacio entre los botones
    width: '80%', // Ancho de los botones
    
  },
});
