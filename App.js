import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebaseAuth} from './rsc/Firebase/config';
import SplashScreen from './rsc/Screens/SplashScreen';
import DetailsScreen from './rsc/Screens/DetailsScreen';
import Tab from './rsc/navigation/Tab';
import Home from './rsc/Home';
import DrawerContent from './rsc/DrawerContent';
import Login from './rsc/Login';
import Registration from './rsc/Registration';
import ForgotPassword from './rsc/ForgotPassword';
import {DetailProvider} from './rsc/context/DetailContext';
import GoogleMap from './rsc/map/MapView';
import MapView from 'react-native-maps';
import EditProfile from './rsc/EditProfile';
import Profile from './rsc/Profile';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = ({navigation}) => {


  return (

    // <GoogleMap/>
    
    <DetailProvider>
    <NavigationContainer style={{backgroundColor: 'green'}}>
   
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        headerMode={''}
        
      // drawerType='front'
      screenOptions={{swipeEnabled: true,}}>
        
        <Drawer.Screen
          name="Splash"
          component={SplashScreen}
          options={{gestureEnabled: false}}
        />
        <Drawer.Screen
          name="login"
          component={Login}
          options={{gestureEnabled: false}}
        />
        <Drawer.Screen name="tab" component={Tab} 
          />

        <Stack.Screen
          name="register"
          component={Registration}
          options={{
            gestureEnabled: false,
            
            headerStyle: {
              backgroundColor: '#996533',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="detailsScreen"
          component={DetailsScreen}
          headerMode={''}
          options={{ 
            
            headerStyle: {
              backgroundColor: '#996533',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          component={ForgotPassword}
          options={{
            headerStyle: {
              backgroundColor: '#996533',
            },
            headerTintColor: '#fff',
          }}
        />
            <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{
         
            headerStyle: {
              backgroundColor: '#996533',
            },
            headerTintColor: '#fff',
          }}
        />
         {/* <Stack.Screen
          name="profile"
          component={Profile}
          options={{
         
            headerStyle: {
              backgroundColor: '#996533',
            },
            headerTintColor: '#fff',
          }}
        /> */}
        {/* <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: '#996533',
            },
            headerTintColor: '#fff'
            

          }}
        /> */}
      </Drawer.Navigator>

      {/* <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="tab" component={Tab} />
        <Stack.Screen
          name="detailsScreen"
          component={DetailsScreen}
          options={{
            headerStyle: {
              backgroundColor: '#996533',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
    </DetailProvider>
  );
};
export default App;

// import React from 'react';
// import AuthProvider from './rsc/AuthProvider';
// import AuthStack from './rsc/AuthStack';
// import Providers from './rsc/index';
// import Login from './rsc/Login';
// import Routes from './rsc/Routes';

// const App = () => {
//   return (
//   <Routes/>
//   )
// }

// export default App;
