import React, {useState, useContext, useRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from './Firebase/config';

const Profile = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [userPass, setUserPass] = useState('khan342');
  const [account, setAccount] = useState(true);
  const [pass, setPass] = useState(true);
  const [dataArray, setDataArray] = useState()
 
    //  console.log("@@@@@@",user)

  const onPressMyAccount = () => {
    setPass(false);
    setAccount(true);
  };
  const onPressPassword = () => {
    setAccount(false);
    setPass(true);
  };


  const showUserData = () => {
 
    const user = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection('user')
      .where('id', '==', user)
      .get()
      .then(querySnapshot => {
     
        querySnapshot.forEach(documentSnapshot => {
          const email= documentSnapshot.data().email;
          const phone= documentSnapshot.data().phone;
          const name = documentSnapshot.data().name;
          console.log("VVVVVVV", documentSnapshot.data())
         
          setName(name)
          setEmail(email)
          setPhoneNum(phone)
        });
        
        
      });
   
  };
  useEffect(() => {
   
    const unsubscribe = navigation.addListener('focus', () => {
      showUserData()
    })
   
  }, [navigation])
  return (
    <View style={styles.container}>
    
      <View style={styles.headerView}>
        <Image source={require('../asset/user.png')} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonDesign}
          onPress={() => onPressMyAccount()}>
          <Text style={styles.buttonText}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressPassword()}
          style={styles.buttonDesign}>
          <Text style={styles.buttonText}>Password</Text>
        </TouchableOpacity>
      </View>
      {account ? (
        <>
        <View style={styles.bottomView}>
          <View style={styles.formContainer}>
            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>Name:</Text>
            </View>
            <View style={styles.inputView}>
              <Text>{name}</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>Email:</Text>
            </View>
            <View style={styles.inputView}>
              <Text>{email}</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>Phone:</Text>
            </View>
            <View style={styles.inputView}>
              <Text>{phoneNum}</Text>
              
            </View>
          </View>
        
        </View>  
          <TouchableOpacity
          style={styles.editbutton}
          onPress={() => navigation.navigate("editProfile")}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
       </>
      ) : (
        <View style={styles.passView}>
          <View style={styles.formContainer}>
            <View style={styles.passTextView}>
              <Text style={styles.passText}>Old Password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                onChangeText={oldpwd => setUserPass({oldpwd})}
                value={userPass}
                underlineColorAndroid="transparent"
                placeholder="Old Password"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.passTextView}>
              <Text style={styles.passText}>New Password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                onChangeText={newpwd => setUserPass({newpwd})}
                value={userPass}
                underlineColorAndroid="transparent"
                placeholder="New Password"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.passTextView}>
              <Text style={styles.passText}>Confirm Password:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                onChangeText={cnfrmpwd => setUserPass({cnfrmpwd})}
                value={userPass}
                underlineColorAndroid="transparent"
                placeholder="Confirm Password"
                placeholderTextColor="grey"
              />
            </View>
          </View>
        </View>
      )}
    
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //               backgroundColor: ThemeStyle.tabBarBackgroundColor,
    // alignItems: "center",
    // justifyContent: "center",
  },
  headerView: {
    flex: 0.3,
    backgroundColor: '#996533',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    margin: 5,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  buttonDesign: {
    backgroundColor: '#996533',
    padding: 10,
    borderRadius: 50,
    width: wp('30%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat-semiBold',
  },
  bottomView: {
    flex: 0.5,
    backgroundColor: '#fff',
    margin: 10,
    shadowOffset: {width: -1.0, height: -2.5},
    shadowOpacity: 5,
    shadowColor: 'grey',
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  bottomTextView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Montserrat-semiBold',
  },
  formContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    paddingVertical: 25,
  },
  inputView: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 300,
    fontSize: 14,
    fontFamily: 'Montserrat-semiBold',
  },
  passView: {
    flex: 0.4,
    backgroundColor: '#fff',
    margin: 10,
    shadowOffset: {width: -1.0, height: -2.5},
    shadowOpacity: 5,
    shadowColor: 'grey',
    padding: 10,
    elevation: 3,
  },
  passTextView: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  passText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Montserrat-semiBold',
  },
  editbutton:{  

    backgroundColor: '#996533',
    padding: 10,
    borderRadius: 50,
    width: wp('95%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:10,
    marginTop:10
  }
});
