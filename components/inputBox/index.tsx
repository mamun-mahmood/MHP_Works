import React, { useState } from "react";
import { Platform, Text } from "react-native";
import { View ,TextInput,KeyboardAvoidingView,TouchableOpacity,SafeAreaView } from "react-native";
import styles from './style'
import {MaterialCommunityIcons,
    FontAwesome5,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons'
    import EmojiSelector from 'react-native-emoji-selector'
const InputBox = (props) => {
  
    const [message,setMessage]=useState('');
    const [showEmoji,setshowEmoji]=useState(false);
const onMicroPhonePressIn=()=>{

props.microPhoneClickedIn()
}
const onMicroPhonePressOut=()=>{
  console.log('MicroPhone Press')
  props.microPhoneClickedOut()
  }

const onSendPress=()=>{
    // console.warn('send Press')  
    props.onMessageSend(message)
    setMessage('')
} 
const onPress=()=>{
        if(!message){
console.log('presed micro phone')
        }else{
onSendPress()
        }
    }

    const onPressCamera=()=>{
      props.cameraPicker()
    }

    const onPressFile=()=>{
      props.onPressFile()
    }
  return (
    <View style={styles.container}>
        <View style={styles.mainContainer}>
           
           {showEmoji? <View><EmojiSelector showTabs={false} 

onEmojiSelected={emoji => { props.onMessageSend(emoji);setshowEmoji(false)}}
/></View>: <TouchableOpacity onPress={()=>{setshowEmoji(true)}}><FontAwesome5 name="laugh-beam" size={24} color="grey"   /></TouchableOpacity>}
            <TextInput
            placeholder="Type a message"
             style={styles.textInput} multiline
            value={message}
            onChangeText={setMessage}
             />
             
             <TouchableOpacity 
            onPress={onPressFile}>
               <Entypo name="attachment" size={24} color="grey"  style={styles.icons} /></TouchableOpacity> 
           
           {!message&&   
            <TouchableOpacity 
            onPress={onPressCamera}>
              <Fontisto name="camera" size={24} color="grey" style={styles.icons} /></TouchableOpacity> 
          }
        </View>
        <TouchableOpacity onPress={onPress}  ><View style={styles.buttonContainer}>
            {!message?<MaterialCommunityIcons name="microphone" size={28} color="white" />
       :   <MaterialIcons name="send" size={28} color="white"  />
    }
          </View></TouchableOpacity>
        
     
    </View>
   
  );
};
export default InputBox;
