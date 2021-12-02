import React from 'react'
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Registration from '../rsc/Registration';
import Login from '../rsc/Login';
 


 
const Stack = createStackNavigator();
 
const AuthStack = () => {
 
  return (
      <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="register"
        component={Registration}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
        //   headerLeft: () => (
        //     <View style={{marginLeft: 10}}>
        //       <Icon
        //         name="long-arrow-left"
        //         size={25}
        //         backgroundColor="#f9fafd"
        //         color="#333"
        //         onPress={() => navigation.navigate('Login')}
        //       />
        //     </View>
        //   ),
        })}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default AuthStack;