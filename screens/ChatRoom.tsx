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

import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native'
const io = require('socket.io-client');
// const ss =  require('socket.io-stream');
// const fs = require('fs');
const SOCKET_URI = "https://socketapi.megahoot.net/"
var socket;

const ChatRoomScreen =(prop)=>{
  const route = useRoute();
  const [sound, setSound] = useState();
  const [userChatData,setUserChatData]=useState([{veroKey:route.params.id,name:route.params.name}])
  const [selectedUserIndex,setselectedUserIndex]=useState(null)
  const [user,setUser]=useState()
  const [MChatMessage,setMChatMessage]=useState([])
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState();

  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('../assets/hello.mp3')
  //   );
  //   setSound(sound);
  //   }

  const handleDeleteToken = async (key,messageData) => {
    console.log(messageData)
    await SecureStore.deleteItemAsync(key).then;
    handleSetChat(key,messageData)
  };
  const handleSetToken = async (key,value) => {
    SecureStore.setItemAsync(key, value).then;
   console.log(value)
  };
  const handleSetChat = async (key,value) => {
    let chat=MChatMessage;
    chat.push(value)
    let data = JSON.stringify(chat)
    console.log(data,"sky this is me")
    SecureStore.setItemAsync(key, data).then;
   console.log(data)
  };

  const handleGetChat = async (key) => {
 
    const tokenFromPersistentState = await SecureStore.getItemAsync(
     key,
    );
    if (tokenFromPersistentState) {
      console.log(tokenFromPersistentState)
     let mydata = JSON.parse(tokenFromPersistentState)
     
    
     console.log(mydata)
    
   
    (mydata? setMChatMessage(mydata): console.log('no sky'))
      // setMChatMessage(old=>[...old,data])
   
    }
  };

  const handleGetTokenFirst = async (key) => {
  
    const tokenFromPersistentState = await SecureStore.getItemAsync(
     key,
    );
    if (tokenFromPersistentState) {
      
      let data = JSON.parse(tokenFromPersistentState)
    
      let name=data.firstName+" "+data.lastName
      let privateKey= data.privateKey
    setUser({name:name,id:privateKey})
    global.name=name;
    global.id=privateKey
    initSocketConnection({name:name, id:privateKey})
    handleGetChat(route.params.id)
    }
  };
  const handleGetToken = async (key) => {
  
    const tokenFromPersistentState = await SecureStore.getItemAsync(
     key,
    );
    if (tokenFromPersistentState) {
      
      let data = JSON.parse(tokenFromPersistentState)
    
      let name=data.firstName+" "+data.lastName
      let privateKey= data.privateKey
    // setUser({name:name,id:privateKey})
    // initSocketConnection({name:name, id:privateKey})
    handleGetChat(route.params.id)
    }
  };
 

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
 
     if (message.from ===global.id) {
       messageData.position = 'right'
       targetId = message.to
      // setMChatMessage(old=>[...old,messageData])
     } else {
       messageData.position = 'left'
       targetId = message.from
       setMChatMessage(old=>[...old,messageData])
       handleSetChat(route.params.id,messageData)
      
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
  handleSetChat(route.params.id,message)
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    let message = {
      to:route.params.id,
      message: {audioUri:uri},
      from: user.id,
      userName:user.name
    }
   setMChatMessage(old => [...old,message])
  socket.emit('message', message)
  }


  const microPhoneHandler=()=>{
  startRecording()
  }

//   const emojiClickHandler=()=>{
// console.log('emoji')
//   }
 
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
      quality: 1,
      base64:true,
      aspect: [9, 16],
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
    let message = {
      to:route.params.id,
      message: result,
      from: user.id,
      userName:user.name
    }
   setMChatMessage(old => [...old,message])
  socket.emit('message', message)
  }
};
  const cameraPickerHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    // let result = await ImagePicker.launchCameraAsync();


    
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64:true,
      aspect: [9, 16],
    });
    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
      let message = {
            to:route.params.id,
            message: result,
            from: user.id,
            userName:user.name
          }
         setMChatMessage(old => [...old,message])
        socket.emit('message', message)
    }
   

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   quality: 1,
    //   base64:true,
    //   aspect: [9, 16],
    // });

  
    // console.log(result);

    // if (!result.cancelled) {
    //   setImage(result.uri);
    //   let message = {
    //     to:route.params.id,
    //     message: result,
    //     from: user.id,
    //     userName:user.name
    //   }
    //  setMChatMessage(old => [...old,message])
    // socket.emit('message', message)
    // }
  };


  useFocusEffect(
    React.useCallback(() => {
      handleGetTokenFirst('userAuthToken')
      
      
     }, [])
   );
  
  
    

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
renderItem={({ item }) => <ChatMessage privateKey={user.id} message={item}   keyExtractor={(item)=>item.veroKey} />}  inverted contentContainerStyle={{ flexDirection: 'column-reverse' }} />

 
      <InputBox onPressFile={pickImage} onMessageSend={createMessage} microPhoneClickedIn={startRecording} microPhoneClickedOut={stopRecording} cameraPicker={cameraPickerHandler} />
</View>

)
}

export default ChatRoomScreen