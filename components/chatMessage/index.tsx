import moment from "moment";
import React, { useEffect } from "react";
import { Text, View,Image } from "react-native";
import { Message } from "../../types";
import styles from "./style";
import { Audio } from 'expo-av';
import { useState } from 'react'

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

console.log(props.message,"sky")
  const { message } = props;

  const isMyMessage = () => {
   return message.from ===props.privateKey;
   
  };

  
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
  
        {message.message.base64? <Image
              style={{ width: 300, height: 480 }}
              source={{uri: 
                `data:image/png;base64,${message.message.base64}`}}></Image>:<Text style={styles.message}>{message.message.text}</Text>}
       {/* {message.message.audioUri? ()=>playSound(message.message.audioUri) :null} */}
        <Text style={styles.time}>{moment(message.message.date).fromNow()}</Text>
      </View>:null}
      
     
    </View>
  );
};

export default ChatMessage;
