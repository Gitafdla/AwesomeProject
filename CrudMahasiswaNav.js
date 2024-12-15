import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faClockRotateLeft, faUserPen, faMapLocationDot, faChargingStation, faBolt } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview'; 
import Createdata from './Createdata';
import Datamahasiswa from './Listdata';
import Editdata from './Editdata';
import Header from './Main';
import { useNavigation } from '@react-navigation/native';


function MapScreen() {
  return (
    <WebView 
      source={{ uri: 'https://leaflet-liart.vercel.app' }} 
      style={{ flex: 1 }} 
    />
  );
}

function MainScreen() {
  return (
      <Header />
  );
}

function HomeScreen() {
  return (
      <Createdata/>
  );
}

function DataMahasiswaScreen() {
  return (
   <Datamahasiswa/>
  );
}

function EditScreen() {
  return (
    <Editdata/>
  );
}

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#ADD8E6', // Light blue background for the tab bar
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: -4 },
            shadowRadius: 10,
          },
          tabBarActiveTintColor: 'black', // Black icons for active tab
          tabBarInactiveTintColor: 'black', // Black icons for inactive tab
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <FontAwesomeIcon icon={faHouse} color="black" size={20} />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <FontAwesomeIcon icon={faMapLocationDot} color="black" size={20} />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Recharge"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <FontAwesomeIcon icon={faBolt} color="black" size={20} />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="History"
          component={DataMahasiswaScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <FontAwesomeIcon icon={faClockRotateLeft} color="black" size={20} />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Details"
          component={EditScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
                <FontAwesomeIcon icon={faUserPen} color="black" size={20} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: 'transparent',
    borderRadius: 30,
    padding: 10,
  },
  iconContainerActive: {
    backgroundColor: 'white', // White circle for the active tab
    borderColor: '#ADD8E6', // Light blue border around the white circle
    borderWidth: 2,
  },
});
