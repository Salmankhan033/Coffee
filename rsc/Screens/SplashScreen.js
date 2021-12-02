import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [value, setValue] = useState();
  let val;
  const getData = async () => {
    try {
      val = await AsyncStorage.getItem('loggedin');

      setValue(val);
      //   console.log(" *****44444",val)
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    getData().then(() => {
      setTimeout(() => {
        // navigation.navigate(value==="true"?"tab" :"login")
        navigation.reset({
          index: 0,
          routes: [
            {
              name: val === 'true' ? 'tab' : 'login',
            },
          ],
        });
      }, 1000);
    });
  }, []);
  useEffect(() => {}, []);
  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', padding: '15%'}}>
      <Image
        source={require('../../asset/logo.png')}
        style={{height: 200, width: 200, marginTop: '32%'}}
      />

      <Text style={styles.text}>
        It's Great<Text> </Text>
        <Text style={{color: '#996533'}}>Day for Coffee</Text>
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  text: {
    paddingTop: 10,
    fontSize: 30,
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
});
