import React, {useState, useEffect, useContext} from 'react';
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
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from './Firebase/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import AuthContext  from './AuthProvider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Registration = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userNum, setUserNum] = useState('');
  const [number, setNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [hidePassword, setHidePassword] = useState(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showEmailError, setShowEmailError] = useState();
  const [showPasswordError, setShowPasswordError] = useState();
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState();
  const [showNameError, setShowNameError] = useState();
  const [showNumError, setShowNumError] = useState();
  // useEffect(()=>{
  //   if(password!==confirmPassword){
  //     alert("Please Confirm your Password")
  //   }
  // },[])

  const storeUserData = () => {
    const user= firebase.auth().currentUser
    const {uid}=user
   firebase
  .firestore()
  .collection('user')
  .doc()
  .set({id:uid, name:username, phone: userNum, email:email})
  .then((res) =>{
 
 
    console.log('******save*****', res)
  });
 
  }
  
  const registerUser = ()=> {
    // setLoading(true);
    if (email === '') {
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
    }
    if (username === '') {
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }
    if (username === '') {
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }
    if (userNum === '') {
      setShowNumError(true);
    } else {
      setShowNumError(false);
    }
    

    if (password === '') {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }

    if (confirmPassword === '') {
      setShowConfirmPasswordError(true);
    } else {
      setShowConfirmPasswordError(false);
    }

    if (
      showEmailError === true ||
      showPasswordError === true ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('jkjl', res);
        storeUserData()
        alert('Congratulations you are Successfully Registered!');
        navigation.navigate('login');
        // console.log('jkjl', res);
      })
      .catch(err => {
        console.log("ERROE", err)
        // alert(err);
      });
    setTimeout(() => {
      setLoading(false);
    }, 2500);

   
  };

  return (
    <SafeAreaView >
         <KeyboardAwareScrollView>
           <View style={styles.container}>
         <Image
        source={require('../asset/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
        <TextInput
        placeholder={'Username'}
        placeholderTextColor="grey"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="name-phone-pad"
        valu={true}
        onChangeText={name => setUsername(name)}
        style={[styles.emailBox, {marginTop:"10%"}]}
      />
       {showNameError === true ? (
        <Text style={{color: 'red', paddingRight: '62%'}}>
          Enter your name
        </Text>
      ) : null}

       <TextInput
        placeholder={'Phone Number'}
        placeholderTextColor="grey"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="number-pad"
        valu={true}
        onChangeText={Num => setUserNum(Num)}
        style={styles.emailBox}
      />
       {showNumError === true ? (
        <Text style={{color: 'red', paddingRight: '47%'}}>
          Enter your Phone number
        </Text>
      ) : null}
      <TextInput
        placeholder={'example@gmail.com'}
        placeholderTextColor="grey"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        valu={true}
        onChangeText={userEmail => setEmail(userEmail)}
        style={styles.emailBox}
      />
      {showEmailError === true ? (
        <Text style={{color: 'red', paddingRight: '47%'}}>
          Enter your Correct Email
        </Text>
      ) : null}
     
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          placeholder={'Password'}
          onChangeText={userPassword => setPassword(userPassword)}
          secureTextEntry={hidePassword ? false : true}
          // secureTextEntry={true}
          placeholderTextColor="grey"
          style={styles.passwordBox}
        />
        <Icon
          style={{position: 'absolute', top: '39%', right: 10}}
          name={hidePassword ? 'eye-off' : 'eye'}
          size={25}
          color="grey"
          onPress={() => setHidePassword(!hidePassword)}
        />
      </View>
      {/* {showPasswordError===true?
      <Text style={{color:'red', paddingRight: '52%'}}>Enter your Password</Text>
      :
      null
      } */}

      <View style={{flexDirection: 'row'}}>
        <TextInput
          placeholder={'Confirm Password'}
          onChangeText={userConfirmPassword =>
            setConfirmPassword(userConfirmPassword)
          }
          secureTextEntry={hideConfirmPassword ? false : true}
          // secureTextEntry={true}
          placeholderTextColor="grey"
          style={{
            height: 40,
            width: '90%',
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 10,
            borderColor: '#996533',
          }}
        />
        <Icon
          style={{position: 'absolute', top: '36%', right: 10}}
          name={hideConfirmPassword ? 'eye-off' : 'eye'}
          size={25}
          color="grey"
          onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
        />
      </View>
      {/* {showConfirmPasswordError===true?
      <Text style={{color:'red', paddingRight: '38%'}}>Enter your Confirm Password</Text>
      :
      null
      } */}

      <TouchableOpacity
        disabled={password !== confirmPassword ? true : false}
        style={[
          styles.registerButton,
          {opacity: password !== confirmPassword ? 0.4 : 3},
        ]}
        onPress={() => registerUser()}>
        <Text style={{color: 'white'}}>
          {loading ? <ActivityIndicator color={'white'} /> : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{paddingTop: 20}}
        onPress={() => navigation.navigate('login')}>
        <Text style={styles.goingToLogin}>
          Have an account.{' '}
          <Text
            style={[styles.goingToLogin, {textDecorationLine: 'underline'}]}>
            Login here
          </Text>
        </Text>
      </TouchableOpacity>
      </View>
      </KeyboardAwareScrollView>
      
    </SafeAreaView>
  );
};
export default Registration;

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
    marginTop: '3%',
    borderColor: '#996533',
  },
  passwordBox: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    borderColor: '#996533',
  },
  registerButton: {
    height: 44,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#996533',
    borderRadius: 5,
    marginTop: 40,
  },
  goingToLogin: {
    color: 'skyblue',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});
