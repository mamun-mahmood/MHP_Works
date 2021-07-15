import React from 'react'
import { View,Text,Image } from 'react-native'
import thlogo from '../assets/images/thlogo.png'
import verologo from '../assets/images/verologo.png'

import Colors from '../constants/Colors'
export default function VeroHive() {
    return (
        <View>
        
            <Image source={thlogo} style={{width:200,height:69,backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />
            <Image source={verologo} style={{width:200,height:69,backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />
                </View>
    )
}




