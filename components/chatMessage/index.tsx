import moment from "moment";
import React, { useEffect } from "react";
import { Text, View,Image } from "react-native";
import { Message } from "../../types";
import styles from "./style";
import { Audio } from 'expo-av';
import { useState } from 'react'
import AudioPlayer from "../audioPlayer";

// export type ChatMessageProps = {
//   message: Message;
// };
// async function playSound(audio) {
//   const [sound, setSound] = useState();
//   console.log('Loading Sound');
//   // const { sound } = await Audio.Sound.createAsync(
//   //    require('./assets/Hello.mp3')
//   // );
//   setSound(audio);

//   console.log('Playing Sound');
//   await sound.playAsync(); }

const ChatMessage = (props) => {
  const [startImageLoading, setStartImageLaoding] = useState(false)
console.log(props.message,"sky")
  const { message } = props;

  const isMyMessage = () => {
   return message.from ===props.privateKey;
   
  };

  const startLoading=()=>{
setStartImageLaoding(true)
  }
  const stopLoading=()=>{
    setStartImageLaoding(false)
  }

  
  return (
    <View style={styles.container}>
      {(message.to==props.hisid || message.from==props.hisid)? <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#e8dcef" : "white",
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.userName}</Text>}
        {isMyMessage() && <Text style={styles.name}>You</Text>}
        {message.message.type=="audio"?<AudioPlayer uri={message.message.uri} />:null}
        {message.message.type=="emoji"?<Text style={{fontSize:50}}>{message.message.text}</Text>:null}
        {message.message.type=="image"? <Image onLoadStart={startLoading} onLoadEnd={stopLoading}
              style={{ width: 320, height: 480 }}
              source={{uri:message.message.uri}}></Image>:<Text style={styles.message}>{message.message.type=="text"?message.message.text:null}</Text>}
   
      
        <Text style={styles.time}>{moment(message.message.date).fromNow()}</Text>
      </View>:null}
      
     
    </View>
  );
};

export default ChatMessage;
