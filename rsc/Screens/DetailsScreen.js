import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DetailContext} from '../context/DetailContext';
import firebase from '../Firebase/config';
import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';
const { width, height } = Dimensions.get("window");
import {widthPercentageToDP as wp, 
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol} from 'react-native-responsive-screen';
// import GoogleMap from '../map/MapView'
// Get user document with an ID of ABC

const DetailsScreen = ({route, navigation}) => {
  const size = [
    {id: 0, image: require('../../asset/cof1.png'), value: true},
    {id: 1, image: require('../../asset/cof1.png'), value: false},
    {id: 2, image: require('../../asset/cof1.png'), value: false},
  ];

  const sugar = [
    {id: 1, imag: require('../../asset/cubee.png'), val: false},
    {id: 2, imag: require('../../asset/cubee.png'), val: false},
    {id: 3, imag: require('../../asset/cubee.png'), val: false},
  ];

  // const details = route.params.details;

  const [count, setCount] = useState(0);
  const [select, setSelect] = useState();

  const [sizeArray, setSizeArray] = useState(size);
  const [sugarArray, setSugarArray] = useState(sugar);
  const [detail, setDetail] = useContext(DetailContext);

  const [favorites, setFavorites] = useState();
  const [liked, setLiked] = useState(false);
  const [color, setColor] = useState();
  // console.log("DETAILLLLL", detail)

  const addToFavorites = detail => {
    firebase
      .firestore()
      .collection('Favorites')
      .doc()
      .set({name: detail.name, price: detail.price, id: detail.id, image: detail.image})
      .then(() =>{
      setLiked(!liked)
        // setFavorites(),
        // console.log('******save*****', favorites)
      });
  };
  const searchInFavorites = detail => {
    firebase
      .firestore()
      .collection('Favorites')
      .where('id', '==', detail.id)
      .get()
      .then(querySnapshot => {
        // console.log("**********",querySnapshot)
        querySnapshot.forEach(documentSnapshot => {
          const id = documentSnapshot.data().id;
          if (id) {
            setLiked(true);
          } else {
            setLiked(false);
          }
          //  console.log("******",id)
        
        });
       
      });
  };
  useEffect(() => {
    setLiked(false);
    searchInFavorites(detail);
  }, [detail]);



  const removeToFavorites = detail => {
    firebase
      .firestore()
      .collection('Favorites')
      .where('id', '==', detail.id)
      .get()
      .then(querySnapshot => {
        setLiked(!liked)
        // console.log("::::::::::",querySnapshot)
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.ref.delete();
          // console.log("Deleteddddddd")
         
        });
      });
  };

  const sizeSelection = index => {
    let array = [...sizeArray];
    array[index].value = !array[index].value;
    setSizeArray(array);
    for (let i = 0; i < sizeArray.length; i++) {
      if (i !== index) array[i].value = false;
    }
  };
  const sugarSelection = index => {
    let array = [...sugarArray];
    array[index].val = !array[index].val;
    setSugarArray(array);
    for (let i = 0; i < sugarArray.length; i++) {
      if (i !== index) array[i].val = false;
    }
  };

  const incrementCounter = () => setCount(count + 1);
  let decrementCounter = () => setCount(count - 1);
  if (count <= 0) {
    decrementCounter = () => setCount(0);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.ImageView}>
        <ImageBackground
          source={require('../../asset/bgg.png')}
          style={styles.bgImage}>
          <View style={{marginBottom: 40}}>
            <Icon
              name="keyboard-backspace"
              size={45}
              color={'#996533'}
              onPress={() => navigation.navigate('tab')}
              style={{position: 'absolute', bottom: '30%', right: '35%'}}
            />
          </View>
          <Image source={detail.image} style={{width: wp ("35%"), height: hp("17%")}} />
        </ImageBackground>
      </View>

      <View style={{flex: 0.7, paddingLeft: 20, padding: 10}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.4}}>
            <Text style={{fontSize: 16, fontFamily: 'Montserrat-Light'}}>
              {detail.name}
            </Text>
            <Text style={styles.itemPrice}>${detail.price}</Text>
          </View>

          <View style={{flex: 0.6, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setCount(decrementCounter)}
              style={styles.decCounter}>
              <Text style={{color: 'white', fontSize: 20}}>-</Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                marginRight: 10,
                paddingTop: Platform.OS === 'ios' ? 6 : 6,
              }}>
              {count}
            </Text>

            <TouchableOpacity
              onPress={() => setCount(incrementCounter)}
              style={styles.incCounter}>
              <Text style={{color: 'white', fontSize: 17}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{marginLeft:"80%",marginTop:'12%'}}>
          <Text>Ad to Favorite</Text>
            <Icon
            name='thumb-up'
            size={24}
            color={"grey"}
            onPress={() =>
              addToFavourites(detail)

            }
            />
            </View> */}
            <View>
        <View style={{justifyContent: 'center', paddingBottom: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, fontFamily: 'Montserrat-Light'}}>
              size
            </Text>
            <Text
              style={{
                marginLeft: '57%',
                fontSize: 15,
                fontFamily: 'Montserrat-Light',
              }}>
              Ad to Favorite
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <FlatList
                horizontal={true}
                data={sizeArray}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={[
                      styles.selection,
                      {borderWidth: item.value ? 1.5 : 0},
                    ]}
                    onPress={() => sizeSelection(index)}>
                    <Image
                      resizeMode={'contain'}
                      style={{width: 25, height: 25, paddingLeft: 2}}
                      source={item.image}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{marginLeft: '45%', marginTop: 8}}>
              <Icon
                name="heart-plus"
                size={30}
                color={liked == true ? 'red' : 'grey'}
                onPress={() => {
                  if (liked === true) {
                    removeToFavorites(detail);
                  } else {
                    addToFavorites(detail);
                  }
                }}
              />
            </View>
          </View>
        </View>
        {/* <View
          style={styles.ItemSize}>
              <TouchableOpacity onPress={()=>setSelect(!select)}>
          <Image source={details.image} 
          value={false}
          style={{height: 20, width: 18,borderWidth:1,  borderColor:"#996533"}} 
           
         />
         </TouchableOpacity>
          <Image
            source={details.image}
            style={{height: 25, width: 21, marginLeft: 10, borderColor:"#996533"}}
          />
          <Image
            source={details.image}
            style={{height: 28, width: 24, marginLeft: 10,borderWidth:1,borderColor:"#996533"} }
          />
        </View> */}
        <View style={{paddingBottom: '20%',}}>
          <Text
            style={{fontSize: 16, margin: 5, fontFamily: 'Montserrat-light'}}>
            Sugar<Text style={{color: 'grey'}}>(in Cubes)</Text>
          </Text>

          <FlatList
            horizontal={true}
            data={sugarArray}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[styles.selection, {borderWidth: item.val ? 1.5 : 0}]}
                onPress={() => sugarSelection(index)}>
                <Image
                  resizeMode={'contain'}
                  style={{width: wp ("6%"), height: hp("6%"), paddingLeft: 2, paddingTop: 5}}
                  source={item.imag}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        </View>
          <TouchableOpacity style={styles.addCart}>
            <Text style={{color: 'white', fontFamily: 'Montserrat-SemiBold'}}>
              Add to Cart
            </Text>
          </TouchableOpacity>
       

    
         
      

      </View>
      
    </SafeAreaView>
  );
};
export default DetailsScreen;

const styles = StyleSheet.create({
  ImageView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCart: {
    backgroundColor: '#996533',
    // marginTop: 60,
    marginLeft:"30%",
    marginBottom: 10,
    height: 50,
    width: '45%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#996533',
    elevation: 7,
    // alignContent:'center'
  },
  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemSize: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
  selection: {
    borderColor: '#996533',
    height: 30,
    width: 30,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decCounter: {
    height: 30,
    marginLeft: '47%',
    width: 35,
    backgroundColor: '#996533',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incCounter: {
    height: 30,
    width: 35,
    backgroundColor: '#996533',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemPrice: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#996533',
  },
});
