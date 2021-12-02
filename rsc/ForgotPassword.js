import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firebase from './Firebase/config';
import {useEffect} from 'react/cjs/react.development';
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState();
    

  const sendEmail = () => {
    // setLoading(true);
    if (email === '') {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }
    if(showEmailError ===true || email ==="" ){
      setLoading(false)
    }else{
      setLoading(true)
    }
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(user => {
        alert('Please check your email...');
        navigation.navigate('login');
      })
      .catch(e => {
        // alert(e);
      });
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };
  return (
    <SafeAreaView style={{justifyContent: 'center', paddingTop: '30%'}}>
      <Text style={styles.title}>Forgot Password?</Text>

      <TextInput
        placeholder={'example@gmail.com'}
        placeholderTextColor="grey"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        style={styles.emailBox}
      />
       {showEmailError===true ? 
        <Text style={{color: 'red', paddingLeft: '6%'}}>
          Enter your Correct email!
        </Text>
        :
        null
      }
      <TouchableOpacity
        style={styles.sendingButton}
        onPress={() => sendEmail()}>
        <Text style={{color: 'white'}}>
          {loading ? <ActivityIndicator color="white" /> : 'Send Email'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingLeft: 20,
    marginTop: '10%',
    fontFamily: 'Montserrat-SemiBold',
  },
  emailBox: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#996533',
    marginTop: '5%',
    marginHorizontal: 20,
  },
  sendingButton: {
    height: 44,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#996533',
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 30,
  },
});
