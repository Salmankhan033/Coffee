import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from './Firebase/config';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [showEmailError, setShowEmailError] = useState();
  const [showPasswordError, setShowPasswordError] = useState();

  const [value, setValue] = useState();
  const [validData, setValidData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidePassword: true,
  });

  // const validationSchema=yup.object().shape({
  //   email: yup.string().required().email().label('email'),
  //   password: yup.string().required().min(4).email().label('password'),
  // })

  const setData = async () => {
    try {
      await AsyncStorage.setItem('loggedin', 'true');
    } catch (e) {
      // error reading value
    }
  };

  const logout = route.params;
  useEffect(() => {
    setEmail('');
    setPassword('');
    // console.log("******empty*******")
  }, [logout]);

  const userLogin =  async () => {
    if (email === '') {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }
    if (password === '') {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
    if (
      showEmailError === true ||
      showPasswordError === true ||
      email === '' ||
      password === ''
    ) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        setData();
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'tab',
            },
          ],
        });
      })
      .catch(err => {
        // alert(err);
      });
    setTimeout(() => {
      setLoading(false);
    }, 2500);

   
  };
  

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
      <Image
        source={require('../asset/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        placeholder={'example@gmail.com'}
        placeholderTextColor="grey"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        // secureTextEntry={true}
        //  onChangeText={handleChange('email')}
        onChangeText={userEmail => setEmail(userEmail)}
        // onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
        value={email}
        style={styles.emailBox}
      />
      {showEmailError === true ? (
        <Text style={{color: 'red', paddingRight: '46%'}}>
          Enter your Correct email!
        </Text>
      ) : null}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder={'Password'}
          onChangeText={userPassword => setPassword(userPassword)}
          secureTextEntry={hidePassword ? false : true}
          // onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
          placeholderTextColor="grey"
          value={password}
          style={styles.passwordBox}
        />
        <Icon
          style={{position: 'absolute', top: '46%', right: 10}}
          name={hidePassword ? 'eye-off' : 'eye'}
          size={25}
          color="grey"
          onPress={() => setHidePassword(!hidePassword)}
        />
      </View>
      {showPasswordError === true ? (
        <Text style={{color: 'red', paddingRight: '46%'}}>
          Enter your Correct email!
        </Text>
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
        <Text style={styles.forgatPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => userLogin()}>
        <Text style={{color: 'white'}}>
          {loading ? <ActivityIndicator color={'white'} /> : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{paddingTop: 20}}
        onPress={() => navigation.navigate('register')}>
        <Text style={styles.goingToRegisteration}>
          Haven't account.{' '}
          <Text
            style={[
              styles.goingToRegisteration,
              {textDecorationLine: 'underline'},
            ]}>
            Register here
          </Text>
        </Text>
      </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30%',
  },
  logo: {
    height: 130,
    width: 130,
    paddingHorizontal: '50%',
  },
  emailBox: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#996533',
    marginTop: '10%',
  },
  passwordBox: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    borderColor: '#996533',
    justifyContent: 'flex-end',
  },
  forgatPassword: {
    padding: 10,
    color: 'grey',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-SemiBold',
  },
  loginButton: {
    height: 44,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#996533',
    borderRadius: 5,
    marginTop: 30,
  },
  goingToRegisteration: {
    color: 'skyblue',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});
