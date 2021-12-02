import React, {useState, useContext, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {useEffect} from 'react/cjs/react.development';
import firebase from './Firebase/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState();
  const [flag, setFlag ]= useState(false)

  // const listener = useRef(null)
  useEffect(() => {
   
    const unsubscribe = navigation.addListener('focus', () => {
      showInFavorites()
    })
   
  }, [navigation])
  useEffect(()=>{
    showInFavorites()
   },[flag])

  const showInFavorites = () => {
    let FavoriteArray = [];
    firebase
      .firestore()
      .collection('Favorites')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const id= documentSnapshot.data().id;
          const image= documentSnapshot.data().image;
          const name = documentSnapshot.data().name;
          const price = documentSnapshot.data().price;
          FavoriteArray.push({
            id:id,
            image: image,
            name: name,
            price: price,
          });
        
          setFavorites(FavoriteArray);
        });
        
      });
    setTimeout(() => {
      // console.log('******DATAAAAAAAA', favorites);
    }, 500);
  };

  const deleteFavorites =(item)=>{
    // const deleteItemId = "SELECTED DOCUEMNT ID HERE";
    // console.log("fgdshgffc",item.item.id)
    const {id}=item.item
    firebase
     .firestore()
     .collection('Favorites')
     .where('id','==', id)
     .get()
     .then((querySnapshot)=> {
      querySnapshot.forEach((doc)=> {
        doc.ref.delete();
       });
      
      setFlag(!flag)
  })
  
  }

 

  return (
    <SafeAreaView>
      <FlatList
        data={favorites}
        renderItem={item => {
          // console.log("vvvvv",item)
          const {name, price, image, id} = item.item;
          return (
            <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center', padding: '4%',}}>
            <TouchableOpacity
              style={styles.container}
            // onPress={()=>{
            //   name
            //   price
            //   image
            //   navigation.navigate("detailsScreen")}}
            >
                <View style={styles.image}>
                <Image source={image}
                style={{height:40, width:30}}/>
                </View>
              <View style={styles.name}>
                <Text style={styles.nameText}>
                  {name}
                </Text>
              </View>
              <View style={styles.price}>
                <Text style={styles.priceText}>
                  $ {price}
                </Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                name="trash-can-outline"
                size={23}
                color={'red'}
                onPress={()=> deleteFavorites(item)}
                />
              </TouchableOpacity>
           </View> 
          );
        }}
         keyExtractor={item=>item.name}
      />
    </SafeAreaView>
 );
};
export default Favorites;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    // padding: '4%',
    marginTop:'2%'
  },
  image:{
    flex:0.3, 
    justifyContent:'center', 
    alignItems:'center'
  },
  name:{
    flex: 0.6,
    justifyContent:'center', 
    marginLeft:'6%'
  },
  nameText:{
    fontFamily: 'Montserrat-semiBold', 
    fontSize: 16
  },
  price:{
    flex: 0.3,
    justifyContent:'center', 
    // alignItems:'center'
  },
  priceText:{
    fontFamily: 'Montserrat-semiBold', 
    color:"#996533"
  }
})