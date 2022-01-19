import React from 'react';
import { View, Alert, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Lyrics from './pages/lyrics/Lyrics';
import Cipher from './pages/cipher/Cipher';
import Search from './pages/search/Search';
import About from './pages/About/About';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Music from './components/Music/Music';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Lyrics navigation={navigation} />
    </View>
  );
}

function CipherScreen({ navigation }) {
  Alert.alert('Em breve!', 'Logo logo teremos cifras 🎉', [
    {
      text: 'Fechar',
      onPress: () => navigation.navigate('Home')
    }
  ])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        onPress={() => navigation.navigate('Music')}
        style={
          ({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#24b1ec'
                : '#5bc8f5'
            },
            style.button
          ]
        }
      >
        <Text style={[style.textStyle]}>Ir para Música</Text>
      </Pressable>
      <Cipher />
    </View >
  );
}

function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Search />
    </View>
  );
}

function AboutScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <About />
    </View>
  );
}

function HomeStackMusic({ navigation, route }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Music" component={HomeScreen} options={{ title: 'Música' }} />
      <Stack.Screen
        name="MusicLetter"
        component={Music}
        options={
          {
            title: route.params?.params.musicTitle,
            headerBackTitle: 'Voltar',
          }
        }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <StatusBar />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'musical-notes'
                  : 'musical-notes-outline';
              } else if (route.name === 'Cipher') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'md-search' : 'md-search-outline'
              } else if (route.name === 'About') {
                iconName = focused ? 'menu' : 'menu-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#5bc8f5',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              overflow: 'hidden'
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackMusic} options={{ headerShown: false, title: 'Música' }} />
          <Tab.Screen name="Cipher" component={CipherScreen} options={{ title: 'Cifras' }} />
          <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar' }} />
          <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Mais' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
}

const style = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 150,
    marginBottom: 10,
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});