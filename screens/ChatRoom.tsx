import React, { useEffect } from 'react'
import { Text ,FlatList,ImageBackground,KeyboardAvoidingView,SafeAreaView } from 'react-native'

import { useRoute } from '@react-navigation/core'
// import chatRoomData from '../data/Chats'
 import ChatMessage from '../components/chatMessage'
import { View } from 'react-native'
import InputBox from '../components/inputBox'

import { useState } from 'react'

const io = require('socket.io-client')

const SOCKET_URI = "http://192.168.29.82:8002"
var socket;

const ChatRoomScreen =()=>{
  const route = useRoute();
  const [userChatData,setUserChatData]=useState([{veroKey:route.params.id,name:route.params.name}])
  const [selectedUserIndex,setselectedUserIndex]=useState(null)
  const [user,setUser]=useState({name: global.name, id: global.privateKey})
  const [MChatMessage,setMChatMessage]=useState([])
  const setupSocketListeners=()=> {
   socket.on('message', onMessageRecieved)
   socket.on('reconnect', onReconnection)
   socket.on('disconnect', onClientDisconnected)
   }
 
 
  const onReconnection=()=> {
     if (user) {
      socket.emit('sign-in', user)
       console.warn('Connection Established.', 'Reconnected!')
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
    console.warn(
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
      userName:route.params.name
    }
   setMChatMessage(old => [...old,message])
  socket.emit('message', message)
 
  console.log(MChatMessage)
  }
  
     useEffect(() => {
     
 
 initSocketConnection({name: global.name, id: global.privateKey})
     }, [])
 
  
  

    return (
      
       
<View style={{justifyContent:'space-between',height:'100%'}}>
 
  <FlatList data={MChatMessage}
renderItem={({ item }) => <ChatMessage message={item}   keyExtractor={(item)=>item.veroKey} />} inverted />
 
      <InputBox onMessageSend={createMessage} />
</View>

)
}

export default ChatRoomScreen