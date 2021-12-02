import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions
} from 'react-native';
import {Value} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DetailContext} from './context/DetailContext';
const { width, height } = Dimensions.get("window");
import {widthPercentageToDP as wp, 
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol} from 'react-native-responsive-screen';

let Array = [];

const data = [
  {
    id: 1,
    name: 'Espresso',
    image: require('../asset/download.png'),
    price: '40',
  },
  {
    id: 2,
    name: 'Cappuccino',
    image: require('../asset/cof1.png'),
    price: '60',
  },
  {
    id: 3,
    name: 'Macchiato',
    image: require('../asset/cc.png'),
    price: '410',
  },
  {
    id: 4,
    name: 'Mocha',
    image: require('../asset/cof1.png'),
    price: '520',
  },
  {
    id: 5,
    name: 'Latte',
    image: require('../asset/cc.png'),
    price: '100',
  },
  {
    id: 6,
    name: 'Latte',
    image: require('../asset/cc.png'),
    price: '100',
  },
  {
    id: 7,
    name: 'Latte',
    image: require('../asset/cc.png'),
    price: '100',
  },
  {
    id: 8,
    name: 'Latte',
    image: require('../asset/cc.png'),
    price: '100',
  },
  {
    id: 9,
    name: 'Latte',
    image: require('../asset/cc.png'),
    price: '100',
  },
  {
    id: 10,
    name: 'Latte',
    image: require('../asset/cc.png'),
    price: '100',
  },
];

const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dataArray, setDataArray] = useState(data);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');

  const [detail, setDetail] = useContext(DetailContext);



  // const userDocument = firestore()
  //                 .collection('Users')
  //                 .doc('id', 'name', 'price')
  //                 .then(()=>{
  //                   console.log("*****save data***")
  //                 })
  // console.log("FROM CONTEXT", detail)
  const Filtering = () => {
    setResults([]);
    Array = [];
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i].name.indexOf(searchQuery) >= 0) {
        Array.push(dataArray[i]);
        setResults(Array);
      }
    }
  };

  useEffect(() => {
    Filtering();
  }, [searchQuery]);

  const Screen = ({item, details}) => {
    return (
      <View style={{}}>
      <TouchableOpacity
        onPress={() => {
          setDetail(item);
          navigation.navigate('detailsScreen');
          
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingTop: "2.2%",
          paddingBottom: "2.2%",
          backgroundColor: '#ppcc99',
        }}>
        <View
          style={{
            Flex: 3,
            justifyContent: 'center',
            marginRight: 50,
            paddingLeft: 10,
          }}>
          <Image source={item.image} style={{height: 70, width: 60}} />
        </View>

        <View style={{flex: 5, justifyContent: 'center'}}>
          <Text style={styles.text}>{item.name}</Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 100,
          }}>
          <Icon
            name="chevron-right"
            size={26}
            style={{paddingEnd: 3}}
            color="#996533"
          />
        </View>
      </TouchableOpacity>
      </View>
    );
  };

  let inputRef = useRef(null);
  const handleSearch = () => {
    inputRef.current.focus();
  };

  return (
    <SafeAreaView style={{padding: 10}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="filter-variant" size={30} color="#996533" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search here"
          onChangeText={text => setSearchQuery(text)}
          style={styles.searchBar}
          ref={inputRef}
        />
        <TouchableOpacity
          onPress={() => {
            handleSearch();
            searchQuery;
          }}>
          <Icon name="magnify" size={30} color="#996533" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        It's Great<Text> </Text>
        <Text style={{color: '#996533'}}>Day for Coffee</Text>
      </Text>
<View style={{height:hp('67%')}}>

      <FlatList
        data={results}
        renderItem={Screen}
        showsVerticalScrollIndicator={false}
      />
     </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    paddingRight: 40,
    marginLeft: 10,
    marginTop: "5%",
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Montserrat-light',
  },
  searchBar: {
    height: hp("4.5%"),
    width: wp('70%'),
    borderColor: '#996533',
    borderWidth: 1,
    borderRadius: 5,
  },
});
