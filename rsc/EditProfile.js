import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from './Firebase/config';

const EditProfile = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

//   var docRef = firebase.firestore().collection("user").doc(firebase.auth().currentUser.uid);
//   var o = {};
//   docRef.get().then(function(thisDoc) {
//       if (thisDoc.exists) {
//           //user is already there, write only last login
//           o.lastLoginDate = Date.now();
//           docRef.update(o);
//       }
//       else {
//           //new user
//           o.displayName = firebase.auth().currentUser.displayName;
//           o.accountCreatedDate = Date.now();
//           o.lastLoginDate = Date.now();
//           // Send it
//           docRef.set(o);
//       }
//       toast("Welcome " + firebase.auth().currentUser.displayName);
//   });
// }).catch(function(error) {
//   toast(error.message);
// });

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
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView>
        <View
          style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Icon
              style={{marginLeft: 10, color: 'white'}}
              name="arrow-left"
              size={30}
            />
          </TouchableOpacity>

          <Text
            style={styles.headerText}>
            Edit Profile
          </Text>
        </View>

        <View style={styles.Container}>
          <View style={styles.formContainer}>
            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>Name:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                onChangeText={name => setName({name})}
                value={name}
                underlineColorAndroid="transparent"
                placeholder="User Name"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>Email:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                onChangeText={Email => setEmail({Email})}
                value={email}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.bottomTextView}>
              <Text style={styles.bottomText}>Phone:</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                onChangeText={number => setPhoneNum({number})}
                value={phoneNum}
                underlineColorAndroid="transparent"
                placeholder="Contact Number"
                placeholderTextColor="grey"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => navigation.navigate('profile')}>
          <Text
            style={styles.submitText}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default EditProfile;

const styles = StyleSheet.create({
  Container: {
    flex: 0.4,
    backgroundColor: '#fff',
    margin: 10,
    shadowOffset: {width: -1.0, height: -2.5},
    shadowOpacity: 5,
    shadowColor: 'grey',
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  header:{
    height: hp('8%'),
    width: wp('100%'),
    backgroundColor: '#996533',
    // justifyContent:'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText:{
    marginLeft: '28%',
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  formContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    paddingVertical: 30,
  },
  bottomTextView: {
    alignItems: 'flex-start',
    paddingLeft: 30,
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Montserrat-semiBold',
  },
  inputView: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft:10,
    height: 40,
    width: 300,
    fontSize: 14,
    fontFamily: 'Montserrat-semiBold',
  },
  submit:{
    backgroundColor: '#996533',
    padding: 10,
    borderRadius: 50,
    width: wp('95%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  submitText:{
    fontSize: 16,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  }
});
