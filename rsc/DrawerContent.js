import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from './Firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerData = [
  {
    id: 1,
    icon: 'food-fork-drink',
    name: 'Menu',
  },
  {
    id: 2,
    icon: 'history',
    name: 'History',
  },
  {
    id: 3,
    icon: 'heart-plus',
    name: 'Favorites',
  },
  {
    id: 4,
    icon: 'marker',
    name: 'Highlights',
  },
  {
    id: 5,
    icon: 'account-box',
    name: 'Contact',
  },
  {
    id: 6,
    icon: 'cog',
    name: 'Settings',
  },
];
const DrawerContent = ({navigation}) => {
  const setData = async () => {
    try {
      await AsyncStorage.setItem('loggedin', '');
    } catch (e) {
      // error reading value
    }
  };
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // navigation.setParams({logoutFlag: true})
        // navigation.navigate('login', {logOut:true})
        navigation.reset(
          {
            index: 0,
            routes: [
              {
                name: 'login',
              },
            ],
          },
          {logOut: true},
        );
        setData();
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerView}>
        <ImageBackground
          source={require('../asset/bgg.png')}
          style={styles.bgImage}>
          <Image
            source={require('../asset/cof1.png')}
            style={{height: 90, width: 80}}
          />
          <Text style={styles.title}>
            It's Great<Text> </Text>
            <Text style={{color: '#996533'}}>Day for Coffee</Text>
          </Text>
        </ImageBackground>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          height: 0.5,
          marginHorizontal: 20,
        }}></View>
      <View style={{flex: 0.7, paddingLeft: 20, paddingTop: 20}}>
        <FlatList
          data={DrawerData}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity style={{flexDirection: 'row', paddingTop: 25}}>
                <Icon name={item.icon} size={30} style={{}} color={'grey'} />
                <Text style={styles.text}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <View>
          <TouchableOpacity
            style={{flexDirection: 'row', paddingVertical: 20}}
            onPress={() => signOut()}>
            <Icon name="logout" size={22} />
            <Text style={{fontSize: 16, fontFamily: 'Montserrat-SemiBold'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
const styles = StyleSheet.create({
  headerView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'grey',
  },
  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 8,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    color: 'black',
    paddingTop: '2%',
    paddingLeft: 30,
    fontSize: 16,
    fontFamily: 'Montserrat-light',
  },
});
