import React, { useState } from "react";
import { Platform, Text } from "react-native";
import { View ,TextInput,KeyboardAvoidingView,TouchableOpacity,SafeAreaView } from "react-native";
import styles from './style'
import {MaterialCommunityIcons,
    FontAwesome5,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons'
const InputBox = (props) => {

    const [message,setMessage]=useState('');
const onMicroPhonePress=()=>{
console.log('MicroPhone Press')
}
const onSendPress=()=>{
    // console.warn('send Press')  
    props.onMessageSend(message)
    setMessage('')
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
       :   <MaterialIcons name="send" size={28} color="white"  />
    }
          </View></TouchableOpacity>
        
     
    </View>
   
  );
};
export default InputBox;
