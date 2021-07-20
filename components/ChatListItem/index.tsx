import React, { useEffect, useState } from "react";
import { Text, View, Image,TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";

import * as SecureStore from 'expo-secure-store';
import axios from "axios";
export type ChatListItemProps = {
  chatRoom: ChatRoom;
};



const ChatListItem = (props: ChatListItemProps) => {

const [LastMessage,setLastMessage]=useState()
const [LastMessageTime,setLastMessageTime]=useState('')


  const { chatRoom } = props;
  const navigation =useNavigation();
  const user = chatRoom;

  const onClick =()=>{

   navigation.navigate('ChatRoom',{id:user.veroKey,name:user.name,imageUri:user.imageUri})
  }

  
//   const handleGetChat = async () => {

//  const verokey=chatRoom.veroKey

//     const tokenFromPersistentState = await SecureStore.getItemAsync(
//      verokey,
//     );
//     if (tokenFromPersistentState) {
//       console.log(tokenFromPersistentState)
//      let mydata = JSON.parse(tokenFromPersistentState)
     
    
//      console.log(mydata,"56sky")
    
   
//     (mydata? setLastMessage(mydata[mydata.length-1].message): console.log('no sky'))
//     // (mydata? setLastMessageTime(mydata[mydata.length-1].message.date): console.log('no sky'))
//       // setMChatMessage(old=>[...old,data])
   
//     }

   
//   };


  // const handleGetChat = (id) => {

  //   let hisId=route.params.id
  //     console.log(hisId,"fetching")
  //   db.transaction(tx => {
  //     // sending 4 arguments in executeSql
  //     tx.executeSql('SELECT * FROM chatData WHERE veroKey=?', [global.veroKey], // passing sql query and parameters:null
  //       // success callback which sends two things Transaction object and ResultSet Object
  //       (txObj, { rows: { _array } }) => {console.log(_array);
          
  //         let mydata = JSON.parse(_array[_array.length-1].chats);
  //         mydata = mydata.filter(user=>user.to!==chatRoom.veroKey)

  //         setLastMessage(mydata[mydata.length-1].message),console.log(mydata,"finalme sky")} ,
  //       // failure callback which sends two things Transaction object and Erro
  //       ) // end executeSQL
  //   }) // end transaction
  // }
  const getMyChat=()=>{
 
     axios.post(`https://api.megahoot.net/api/users/getMyChatData`,{
       to:user.veroKey,
       from:global.privateKey
     }).then((res)=>{
     setLastMessage(JSON.parse(res.data.message[res.data.message.length-1].chat)) ;
    //  console.log(JSON.parse(res.data.message[res.data.message.length-1].chat))
      })
      .catch((err)=>{
        console.log(err)
        
      })
  }

  useEffect(() => {
      
    getMyChat()
   }, [])
  return (
    <TouchableWithoutFeedback onPress={onClick}> 
    
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: user.ProfilePic }} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          {LastMessage? <Text numberOfLines={1} style={styles.lastMessage}>
            {LastMessage.text}
          </Text>:null}
         
        </View>
      </View>
{LastMessage? <Text style={styles.time}>

{moment(LastMessage.createdAt).fromNow()}   
          </Text>:null}
     
    </View>
    
    </TouchableWithoutFeedback>
   
  );
};

export default ChatListItem;
