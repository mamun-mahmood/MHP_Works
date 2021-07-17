import React from 'react'
import { View,Text,Image, FlatList } from 'react-native'
import thlogo from '../assets/images/thlogo.png'
import verologo from '../assets/images/verologo.png'
import deallogo from '../assets/images/deallogo.png'

import Colors from '../constants/Colors'
const images=[{src:verologo},{src:thlogo},{src:deallogo}]
export default function VeroHive() {
    return (
        <View>

{/* <Image source={thlogo} style={{width:'100%',height:'',backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />
            <Image source={verologo} style={{width:'100%',height:69,backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />
        
         */}
          <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
<Image source={item.src} style={{width:'100%',height:730}} />
        
        )}
        inverted
        contentContainerStyle={{ flexDirection: "column-reverse" }}
      />
                    </View>
    )
}




