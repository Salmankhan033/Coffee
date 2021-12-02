import React, {useContext, useState} from 'react';
import {Text, View, Image} from 'react-native';
import {DetailContext} from './context/DetailContext'
// import { DetailProvider } from './context/DetailContext';

const Loading =({navigation})=>{
    // const [detail,setDetail]=useContext(DetailContext)
//     return detail.map(list=>{
//           return(
//             <View style={{justifyContent:"center", alignItems:"center"}}>
          
//             <Image
//             style={{height:300, width:300}}
//             source={list.image}/>
//                 <Text>{list.name}</Text>
//                 {/* <Image
//             style={{height:300, width:300}}
//             source={detail.image}/>
//                 <Text>{detail.name}</Text> */}
//    </View>
//           )

//       })
      
    return(
        <View>
            <Text>Upload</Text>
        </View>
    )
}
export default Loading;