import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DetailsScreen from '../Screens/DetailsScreen';
import Home from '../Home';
import Location from '../Location';
import HomeScreen from '../HomeScreen';
import Favorites from '../Favorites';
import Profile from '../Profile';

const Tab = createBottomTabNavigator();
const HomeStack=createStackNavigator();
const Stack = createStackNavigator();

const CustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        
        top: 0,
        elevation: 10,
        shadowColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          height: 65,
          width: 65,
          elevation: 5,
          shadowRadius: 15,
          shadowColor: 'black',
          backgroundColor: '#996533',
          borderRadius: 35,
          borderColor: '#996533',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
     
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 22,
          left: 18,
          right: 18,
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 75,
          justifyContent:"center",
          alignItems:"center",
          ...styles.shadow,
        },
        activeTintColor: '#996533',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarLabel: 'Location',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Location',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={'white'}
              size={50}
            />
          ),
          tabBarButton: props => <CustomButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart-plus" color={color} size={28} />
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};



const HomeStackScreen =({navigation})=>(
 
  <HomeStack.Navigator headerMode={'none'}>
     
      <HomeStack.Screen
        name="detailsScreen"
        component={DetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#996533',
          },
          headerTintColor: '#fff',
        }}
      />
    </HomeStack.Navigator>

)

export default MyTabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#996533',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 8.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
