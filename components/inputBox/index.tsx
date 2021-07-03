import React, { useState } from "react";
import { Platform, Text } from "react-native";
import { View ,TextInput,KeyboardAvoidingView,TouchableOpacity} from "react-native";
import styles from './style'
import {MaterialCommunityIcons,
    FontAwesome5,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons'
const InputBox = () => {

    const [message,setMessage]=useState('');
const onMicroPhonePress=()=>{
console.warn('MicroPhone Press')
}
const onSendPress=()=>{
    console.warn('send Press')  
} 
const onPress=()=>{
        if(!message){
onMicroPhonePress()
        }else{
onSendPress()
        }
    }
  return (
    <View style={styles.container}>
        <View style={styles.mainContainer}>
            <FontAwesome5 name="laugh-beam" size={24} color="grey" />
           
            <TextInput
            placeholder="Type a message"
             style={styles.textInput} multiline
            value={message}
            onChangeText={setMessage}
             />
            <Entypo name="attachment" size={24} color="grey" style={styles.icons} />
           {!message&& <Fontisto name="camera" size={24} color="grey" style={styles.icons} />
          }
        </View>
        <TouchableOpacity onPress={onPress}><View style={styles.buttonContainer}>
            {!message?<MaterialCommunityIcons name="microphone" size={28} color="white" />
       :   <MaterialIcons name="send" size={28} color="white" />
    }
          </View></TouchableOpacity>
        
     
    </View>
   
  );
};
export default InputBox;
