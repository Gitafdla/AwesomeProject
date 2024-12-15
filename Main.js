
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Header = () => {
  // Function to handle link opening
  const handleContactPress = () => {
    Linking.openURL('https://www.instagram.com/digitafdla/')
      .catch((err) => console.error('Failed to open URL:', err));
  };

  // Function to open the map URL
  const handleRegulasiPress = () => {
    Linking.openURL('https://gatrik.esdm.go.id/assets/uploads/download_index/files/f0294-bahan-dirbinus.pdf')
      .catch((err) => console.error('Failed to open URL:', err));
  };

  const handleTempat1Press = () => {
    Linking.openURL('https://maps.app.goo.gl/SVo3kdrerg3LaAL7A')
      .catch((err) => console.error('Failed to open URL:', err));
  };
  const handleTempat2Press = () => {
    Linking.openURL('https://maps.app.goo.gl/6XDV74RAAhrey2zV7')
      .catch((err) => console.error('Failed to open URL:', err));
  };
  const handleTempat3Press = () => {
    Linking.openURL('https://maps.app.goo.gl/cQChRyPS8R5GGPFo6')
      .catch((err) => console.error('Failed to open URL:', err));
  };

  const handleOpenMapPress = () => {
    Alert.alert(
        "Open Map",
        "Trying To Find SPKLU?",
        [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => navigation.navigate('Listdata') }, // Navigasi ke MapScreen
        ]
    );
};

  
  

  return (
    <View style={styles.container}>
      {/* Header image */}
      <ImageBackground
        source={require('./spklu.jpeg')} // Ganti dengan path gambar SPLU Anda
        style={styles.headerImage}>
        <Text style={styles.headerTitle}>VoltFinder</Text>
        <Text style={styles.headerSubTitle}>Aplikasi SPLU Untuk Masa Depan Hijau</Text>
      </ImageBackground>

      {/* Description section */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Selamat datang di VoltFinder!</Text>
        <Text style={styles.descriptionText}>
          VoltFinder adalah aplikasi inovatif yang dirancang untuk membantu Anda menemukan
          Stasiun Pengisian Listrik Umum (SPLU) dengan mudah. Dengan fitur pencarian canggih,
          kami mendukung pengembangan energi hijau dan mempercepat transisi menuju masa depan yang lebih bersih.
        </Text>
      </View>

      {/* Tab navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity style={styles.tabButton} onPress={handleRegulasiPress}>
          <Text style={styles.tabText}>Regulation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleOpenMapPress}>
          <Text style={styles.tabText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleContactPress}>
          <Text style={styles.tabText}>Contact</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
  <TouchableOpacity style={styles.placeCard} onPress={handleTempat1Press}>
    <ImageBackground
      source={require('./spklu1.jpeg')} // Ganti dengan path gambar tempat 1
      style={styles.placeImage}>
      <Text style={styles.placeText}>Fatmawati</Text>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity style={styles.placeCard} onPress={handleTempat2Press}>
    <ImageBackground
      source={require('./spklu2.jpg')} // Ganti dengan path gambar tempat 1
      style={styles.placeImage}>
      <Text style={styles.placeText}>Pantai Indah</Text>
    </ImageBackground>
  </TouchableOpacity>

  <TouchableOpacity style={styles.placeCard} onPress={handleTempat3Press}>
    <ImageBackground
      source={require('./spklu3.jpeg')} // Ganti dengan path gambar tempat 1
      style={styles.placeImage}>
      <Text style={styles.placeText}>Bandengan Utara</Text>
    </ImageBackground>
  </TouchableOpacity>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    
  },
  headerImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  placeCard: {
    width: 120, // Lebar setiap tempat
    height: 120, // Tinggi setiap tempat
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10, // Beri jarak antar elemen
  },

  headerTitle: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: 'bold', // Make the text bold
    textAlign: 'center',
    textShadowColor: '#000', // Black shadow color
    textShadowOffset: { width: 2, height: 2 }, // Offset for the shadow
    textShadowRadius: 10, // The blur radius of the shadow
  },
  
  headerSubTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000', // Black shadow color
    textShadowOffset: { width: 2, height: 2 }, // Offset for the shadow
    textShadowRadius: 1, // The blur radius of the shadow
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  tabNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ADD8E6',
  },
  tabButton: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#007BFF',
  },
  gridContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  placeCard: {
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  placeImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  placeText: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    textAlign: 'center',
  },

  scrollContainer: {
    marginVertical: 10,
  },
});

export default Header;
