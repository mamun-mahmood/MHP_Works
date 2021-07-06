import React, { useEffect } from 'react'
import { Text ,FlatList,ImageBackground,KeyboardAvoidingView,SafeAreaView, Platform } from 'react-native'

import { useRoute } from '@react-navigation/core'
// import chatRoomData from '../data/Chats'
 import ChatMessage from '../components/chatMessage'
import { View } from 'react-native'
import InputBox from '../components/inputBox'
import { Audio } from 'expo-av';
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
const io = require('socket.io-client')

const SOCKET_URI = "https://socketapi.megahoot.net/"
var socket;

const ChatRoomScreen =()=>{
  const route = useRoute();
  const [sound, setSound] = useState();
  const [userChatData,setUserChatData]=useState([{veroKey:route.params.id,name:route.params.name}])
  const [selectedUserIndex,setselectedUserIndex]=useState(null)
  const [user,setUser]=useState({name: global.name, id: global.privateKey})
  const [MChatMessage,setMChatMessage]=useState([])
  const [image, setImage] = useState(null);

  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('../assets/hello.mp3')
  //   );
  //   setSound(sound);
  //   }

  const setupSocketListeners=()=> {
   socket.on('message', onMessageRecieved)
   socket.on('reconnect', onReconnection)
   socket.on('disconnect', onClientDisconnected)
   }
 
 
  const onReconnection=()=> {
     if (user) {
      socket.emit('sign-in', user)
       console.log('Connection Established.', 'Reconnected!')
     }
   }
 
 const onMessageRecieved=(message)=> {
   
     let messageData = message
     let targetId

    //  setMChatMessage(old=>[...old,messageData])
 
     if (message.from ===global.privateKey) {
       messageData.position = 'right'
       targetId = message.to
      // setMChatMessage(old=>[...old,messageData])
     } else {
       messageData.position = 'left'
       targetId = message.from
       setMChatMessage(old=>[...old,messageData])
      //  playSound()
     }
    //  let targetIndex = userChatData.findIndex((u) => u.veroKey === targetId)
    // // alert(targetIndex)
    //  if (!userChatData[targetIndex].messages) {
    //    userChatData[targetIndex].messages = []
    //  }
    //  if (targetIndex !== selectedUserIndex) {
    //    if (!userChatData[targetIndex].unread) {
    //      userChatData[targetIndex].unread = 0
    //    }
    //    userChatData[targetIndex].unread++
    //  }
    //  userChatData[targetIndex].messages.push(messageData)

 
   }
 
  const onClientDisconnected=()=> {
    console.log(
       'Connection Lost from server please check your connection.',
       'Error!'
     )
   }
 
  const initSocketConnection=(data)=> {
 
   socket = io(SOCKET_URI)
     console.log(data)
     socket.emit('sign-in', data)
     setupSocketListeners()
   }
 const createMessage=(text)=> {
    let message = {
      to:route.params.id,
      message: {
        type: 'text',
        text: text,
        date: +new Date(),
        className: 'message',
      },
      from: user.id,
      userName:user.name
    }
   setMChatMessage(old => [...old,message])
  socket.emit('message', message)
 
  console.log(MChatMessage)
  }


  const microPhoneHandler=()=>{
    console.log('recording')
  }

//   const emojiClickHandler=()=>{
// console.log('emoji')
//   }
 

  const cameraPickerHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  
  
     useEffect(() => {
     
 
 initSocketConnection({name: global.name, id: global.privateKey})
 
//  return sound
//  ? () => {
//      console.log('Unloading Sound');
//      sound.unloadAsync(); }
//  : undefined;
     }, [])

     useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);



 
  

    return (
      
       
<View style={{justifyContent:'space-between',height:'100%'}}>
 
  <FlatList data={MChatMessage}
renderItem={({ item }) => <ChatMessage message={item}   keyExtractor={(item)=>item.veroKey} />}  inverted contentContainerStyle={{ flexDirection: 'column-reverse' }} />

 
      <InputBox onMessageSend={createMessage} microPhoneClicked={microPhoneHandler} cameraPicker={cameraPickerHandler} />
</View>

)
}

export default ChatRoomScreen