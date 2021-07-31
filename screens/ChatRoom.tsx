import React, { useEffect ,useCallback} from "react";
import {
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

import { useRoute } from "@react-navigation/core";
// import chatRoomData from '../data/Chats'
import AudioPlayer from "../components/audioPlayer";
import { View } from "react-native";
import InputBox from "../components/inputBox";
import { Audio } from "expo-av";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../components/ChatListItem/style";
import Spinner from 'react-native-loading-spinner-overlay';
import ImageViewer from 'react-native-image-zoom-viewer';
import socket, { startSocket } from "../socket";
import { CDateTimePicker } from "../components/Timer/datetimePicker";
import Colors from "../constants/Colors";
import axios from "axios";
import flameFireGif from '../assets/images/flame.gif'
import sticker1 from '../assets/stickers/sticker1.png'
import sticker2 from '../assets/stickers/sticker2.png'
import sticker3 from '../assets/stickers/sticker3.png'
import sticker4 from '../assets/stickers/sticker4.png'
import sticker5 from '../assets/stickers/sticker5.png'
import sticker6 from '../assets/stickers/sticker6.png'
import sticker7 from '../assets/stickers/sticker7.png'
import sticker8 from '../assets/stickers/sticker8.png'
import { Avatar, Bubble, GiftedChat } from 'react-native-gifted-chat';
const ChatRoomScreen = () => {
  const route = useRoute();
  const [user, setUser] = useState();
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState();
  const [userTyping, setuserTyping] = useState(false);
  const [isTimerButton, setisTimerButton] = useState(false);
  const [UploadLoading, setUploadLoading] = useState(false);
  const [chatLoading, setchatLoading] = useState(false);
  const [isTimerTime, setisTimerTime] = useState(false);
  const [messageIsBurning, setmessageIsBurning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [timeoutTime, setTimeoutTime] = useState();
  const [stickers,setStickers]=useState(false)
 const [isModalView,setModalView]=useState(false)
 const [TempimageUri,setTempimageUri]=useState('')
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: route.params.id,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //     {
  //       _id: 7757558758,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 3,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, []);
const getMyChat=()=>{
  setchatLoading(true)
   axios.post(`https://messangerapi533cdgf6c556.amaprods.com/api/users/getMyChatData`,{
     to:route.params.id,
     from:global.privateKey
   }).then((res)=>{
    // const slicedArray = res.data.message.slice(res.data.message.length-10, res.data.message.length);
    // //  console.log(res.data)
    // slicedArray.forEach((d)=>{

    //   let myChatData=JSON.parse(d.chat)
    //   console.log(myChatData)
    //   setMessages(previousMessages => GiftedChat.append(previousMessages, myChatData))
      
    //  })
    // console.log(res.data.message)
    setMessages(res.data.message)
   setchatLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setchatLoading(false)
    })
}


const renderBubble=(props)=> {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: Colors.light.tint,
        },
      }}
    />
  );
}


  useEffect(() => {
    setchatLoading(true)
   getMyChat()
  }, [])

  const sendFilter=(uri)=>{
    let message = {
      to: route.params.id,
      message: {type:"image",uri:uri},
      from: user.id,
      userName: user.name,
      TimerTime: isTimerTime,
      timeoutTime:timeoutTime,
      data:{
          _id: create_UUID()+uri,
          image: uri,
          emoji:true,
          createdAt: new Date(),
          user: {
            _id: global.privateKey,
            name: global.name,
            avatar: global.imageUri
          },
        },
      
    };
   
    socket.emit("message", message);
  setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
  }

  const onSend = useCallback((messages = []) => {
    
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    createMessage(messages)
  }, [])
  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(
  //      require('../assets/hello.mp3')
  //   );
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync(); }

  const playYouSound = async () => {
    let youSoundObject = new Audio.Sound();
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/hello.mp3")
      );
      await youSoundObject.loadAsync(sound);
      await youSoundObject.playAsync();
    } catch (error) {
      await youSoundObject.unloadAsync(); // Unload any sound loaded
      youSoundObject.setOnPlaybackStatusUpdate(null); // Unset all playback status loaded
      playYouSound();
    }
  };

  const handleDeleteToken = async (key, messageData) => {
    console.log(messageData);
    await SecureStore.deleteItemAsync(key).then;
  };
  const handleSetToken = async (key, value) => {
    SecureStore.setItemAsync(key, value).then;
    //  console.log(value)
  };
  const handleSetChat = async (key, value) => {
    let chat =messages;
    chat.push(value);
    console.log(chat)
    let data = JSON.stringify(chat);
    console.log(data, "sky this is me");
    SecureStore.setItemAsync(key, data).then;
    console.log(data);
  };

  const handleGetChat = async (key) => {
   
    const tokenFromPersistentState = await SecureStore.getItemAsync(key);
    if (tokenFromPersistentState) {
      // console.log(tokenFromPersistentState)
      let mydata = JSON.parse(tokenFromPersistentState);
      
       console.log(mydata)

      mydata[0] ? setMessages(mydata) : console.log("no sky");
      // setMChatMessage(old=>[...old,data])
    }
  };

  const handleGetTokenFirst = async (key) => {
    const tokenFromPersistentState = await SecureStore.getItemAsync(key);
    if (tokenFromPersistentState) {
      let data = JSON.parse(tokenFromPersistentState);

      let name = data.firstName + " " + data.lastName;
      let privateKey = data.privateKey;
      setUser({ name: name, id: privateKey });
      global.name = name;
      global.id = privateKey;

      //  handleGetChat(route.params.id)

      // fetchData(privateKey)
    }
  };
  const handleGetToken = async (key) => {
    const tokenFromPersistentState = await SecureStore.getItemAsync(key);
    if (tokenFromPersistentState) {
      let data = JSON.parse(tokenFromPersistentState);

      let name = data.firstName + " " + data.lastName;
      let privateKey = data.privateKey;
      // setUser({name:name,id:privateKey})
      // initSocketConnection({name:name, id:privateKey})
      // handleGetChat(route.params.id)
    }
  };

  const setupSocketListeners = () => {
    socket.on("message", onMessageRecieved);
    socket.on("reconnect", onReconnection);
    socket.on("disconnect", onClientDisconnected);
  };

  const onReconnection = () => {
    console.log("Connection Established.", "Reconnected!");
  };

  const onMessageRecieved = (message) => {
    console.log(message)
    let messageData = message;
    let targetId;
console.log('receiving m times')
    //  setMChatMessage(old=>[...old,messageData])
    if (message.to == global.id && message.from == route.params.id) {
      if (message.from === global.id) {
        messageData.position = "right";
        targetId = message.to;

        // setMChatMessage(old=>[...old,messageData])
      } else {
        messageData.position = "left";
        targetId = message.from;
        if (messageData.message.type == "typing") {
          if(!userTyping){
             setuserTyping(true)
    setTimeout(() => {
      setuserTyping(false)
    }, 3000);
          }
         
        } else {
          setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
          // handleSetChat(route.params.id,message.data)
          // newItem(messageData)
          // handleSetChat(route.params.id,messageData)
          // playYouSound;
          if(message.TimerTime){
            let filterData=messages.filter(e=>e._id!==message.data._id)
            console.log('removing')
           setTimeout(() => {
          
            setmessageIsBurning(true)
           setMessages(previousState =>
              (previousState.filter(e => e._id !== message.data._id)))
        //  setMessages(filterData)
     
         setTimeout(() => {
          setmessageIsBurning(false)
         }, 500);
           }, message.timeoutTime*1000);
         }
        }
      }

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
  };

  const onClientDisconnected = () => {
    console.log(
      "Connection Lost from server please check your connection.",
      "Error!"
    );

    startSocket();
    // setupSocketListeners();
  };

  const initSocketConnection = () => {
    // startSocket()
    setupSocketListeners();
  };
  const create_UUID=()=>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


const handleStickers=()=>{
  setStickers(!stickers)
}
  const createMessage = (text) => {
    let mid=create_UUID()
    let message = {
      to: route.params.id,
      message: {
        type: "text",
        text: text,
        date: +new Date(),
        className: "message",
      },
     
      from: global.id,
      userName: global.name,
      TimerTime: isTimerTime,
      timeoutTime:timeoutTime,
      data:{
          _id:mid ,
          text: text,
          createdAt: new Date(),
          user: {
            _id: global.privateKey,
            name: global.name,
            avatar: global.imageUri
           
          },
        },
      
    };
    console.log(message.TimerTime)
    socket.emit("message", message);
   
     setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
     if(message.TimerTime){
       console.log('removing')
      setTimeout(() => {
     
    console.log(messages.filter(e=>e._id!==message.data._id))
      // setMessages(previousState =>
      //    ({ messages: previousState.filter(e => e._id !== message.data._id) }))
      setmessageIsBurning(true)
      setMessages(previousState =>
        (previousState.filter(e => e._id !== message.data._id)))
        
   
    setTimeout(() => {
     setmessageIsBurning(false)
    },500);
      },  message.timeoutTime*1000);
    }
    // newItem(message)                              
    // console.log(MChatMessage)                          
    //  handleSetChat(route.params.id,message.data)
  };

  const createMessageEmoji = (text) => {
    let mid=create_UUID()
    let message = {
      to: route.params.id,
      message: {
        type: "text",
        text: text,
        date: +new Date(),
        className: "message",
      },
     
      from: global.id,
      userName: global.name,
      TimerTime: isTimerTime,
      timeoutTime:timeoutTime,
      data:{
          _id:mid ,
          text: text,
          createdAt: new Date(),
          user: {
            _id: global.privateKey,
            name: global.name,
            avatar: global.imageUri
           
          },
        },
      
    };

    socket.emit("message", message);
    setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
    if(message.TimerTime){
      console.log('removing')
     setTimeout(() => {
    
  //  console.log(messages.filter(e=>e._id!==message.data._id))
     // setMessages(previousState =>
     //    ({ messages: previousState.filter(e => e._id !== message.data._id) }))
     setmessageIsBurning(true)
     setMessages(previousState =>
      (previousState.filter(e => e._id !== message.data._id)))
  
   setTimeout(() => {
    setmessageIsBurning(false)
   }, 500);
     }, message.timeoutTime*1000);
   }
   
    // newItem(message)
    // console.log(MChatMessage)
    //  handleSetChat(route.params.id,message)
  };

  const onFlamePresses = () => {
    setisTimerButton(!isTimerButton);
    setisTimerTime(!isTimerTime)
  };

  const OnCurrentDate = (data) => {
    console.log(data)
    // setisTimerTime(data);
    setisTimerButton(false);
    
  };

  const startTyping = () => {
    let message = {
      to: route.params.id,
      message: {
        type: "typing",
        text: "typing",
        date: +new Date(),
        className: "message",
      },

      from: global.id,
      userName: global.name,
    };
    socket.emit('message', message)
    // setuserTyping(true)
    // setTimeout(() => {
    //   setuserTyping(false)
    // }, 5000);
   
   
  };

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();


    
    console.log("Recording stopped and stored at", uri);
    if (uri) {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {_id: create_UUID(),
        audio: uri,
        createdAt: new Date(),
        user: {
          _id: global.privateKey,
          name: global.name,
          avatar: global.imageUri
        },}))
      setImage(uri);
      setUploadLoading(true)
      let apiUrl = 'https://api.fortisab.com/uploadAudio';
  
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
    
      let formData = new FormData();
      formData.append('audio', {
        uri,
        name: `audio.${fileType}`,
        type: `audio/${fileType}`,
      });
    
      let options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
    
    let uploadResponse= await fetch(apiUrl, options)
     let uploadResult = await uploadResponse.json()

      console.log(uploadResult.location)
      let message = {
        to: route.params.id,
        message: {
          type: "text",
          text: uploadResult.location,
          date: +new Date(),
          className: "message",
        },
       
        from: global.id,
        userName: global.name,
        TimerTime: isTimerTime,
        timeoutTime:timeoutTime,
        data:{
            _id: create_UUID(),
            audio: uploadResult.location,
            createdAt: new Date(),
            user: {
              _id: global.privateKey,
              name: global.name,
              avatar: global.imageUri
            },
          },
      };
  
      socket.emit("message", message);
      //  setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
      setUploadLoading(false)
      if(message.TimerTime){
        console.log('removing')
       setTimeout(() => {
      
     console.log(messages.filter(e=>e._id!==message.data._id))
       // setMessages(previousState =>
       //    ({ messages: previousState.filter(e => e._id !== message.data._id) }))
       setmessageIsBurning(true)
       setMessages(previousState =>
        (previousState.filter(e => e._id !== message.data._id)))
 
     setTimeout(() => {
      setmessageIsBurning(false)
     }, 500);
       }, message.timeoutTime*1000);
     }
}
    // let message = {
    //   to: route.params.id,
    //   message: { audioUri: uri },
    //   from: user.id,
    //   userName: user.name,
    // };
    // setMChatMessage((old) => [...old, message]);
    // socket.emit("message", message);
  }

  const microphoneLongPressStart = () => {
    console.log('microphoneLongPressStart')
   startRecording();
  };
  const microphoneLongPressOut = () => {
    console.log('microphoneLongPressOut')
stopRecording()
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64:true
      
    });
    if(!result.cancelled){
      if(result.type=="image"){
    setUploadLoading(true)
    setMessages(previousMessages => GiftedChat.append(previousMessages, {_id: create_UUID(),
      image: result.uri,
      createdAt: new Date(),
      user: {
        _id: global.privateKey,
        name: global.name,
        avatar: global.imageUri
       
      },}))
    let apiUrl = 'https://api.fortisab.com/upload';
    let uri=result.uri
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
  let uploadResponse= await fetch(apiUrl, options)
   let uploadResult = await uploadResponse.json()

    console.log(uploadResult.location)
    let message = {
      to: route.params.id,
      message: {type:"image",uri:uploadResult.location},
      from: user.id,
      userName: user.name,
      TimerTime: isTimerTime,
      timeoutTime:timeoutTime,
      data:{
          _id: create_UUID()+uploadResult.location,
          image: uploadResult.location,
          createdAt: new Date(),
          user: {
            _id: global.privateKey,
            name: global.name,
            avatar: global.imageUri
          },
        },
      
    };
   
    socket.emit("message", message);
  //  setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
    setUploadLoading(false)
    if(message.TimerTime){
      console.log('removing')
     setTimeout(() => {
    
   console.log(messages.filter(e=>e._id!==message.data._id))
     // setMessages(previousState =>
     //    ({ messages: previousState.filter(e => e._id !== message.data._id) }))
     setmessageIsBurning(true)
     setMessages(previousState =>
      (previousState.filter(e => e._id !== message.data._id)))
 
   setTimeout(() => {
    setmessageIsBurning(false)
   }, 500);
     }, message.timeoutTime*1000);
   }


}else{
    setUploadLoading(true)
    setMessages(previousMessages => GiftedChat.append(previousMessages, {_id: create_UUID(),
      video: result.uri,
      createdAt: new Date(),
      user: {
        _id: global.privateKey,
        name: global.name,
        avatar: global.imageUri
      },}))
    let apiUrl = 'https://api.fortisab.com/uploadVideo';
    let uri=result.uri
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('video', {
      uri,
      name: `video.${fileType}`,
      type: `video/${fileType}`,
    });
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
  let uploadResponse= await fetch(apiUrl, options)
   let uploadResult = await uploadResponse.json()

    console.log(uploadResult.location)
    let message = {
      to: route.params.id,
      message: {type:"video",uri:uploadResult.location},
      from: user.id,
      userName: user.name,
      TimerTime: isTimerTime,
      timeoutTime:timeoutTime,
      data:{
          _id: create_UUID()+uploadResult.location,
          video: uploadResult.location,
          createdAt: new Date(),
          user: {
            _id: global.privateKey,
            name: global.name,
            avatar: global.imageUri
          },
        },
      
    };
   
    socket.emit("message", message);
  //  setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
    setUploadLoading(false)
    if(message.TimerTime){
      console.log('removing')
     setTimeout(() => {
    
   console.log(messages.filter(e=>e._id!==message.data._id))
     // setMessages(previousState =>
     //    ({ messages: previousState.filter(e => e._id !== message.data._id) }))
     setmessageIsBurning(true)
     setMessages(previousState =>
      (previousState.filter(e => e._id !== message.data._id)))
 
   setTimeout(() => {
    setmessageIsBurning(false)
   }, 500);
     }, message.timeoutTime*1000);
   }
}
    }

 

 
    }


  const cameraPickerHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {_id: create_UUID(),
        image: result.uri,
        createdAt: new Date(),
        user: {
          _id: global.privateKey,
          name: global.name,
          avatar: global.imageUri
        },}))
      setImage(result.uri);
      setUploadLoading(true)
      let apiUrl = 'https://api.fortisab.com/upload';
      let uri=result.uri
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      
        let options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        };
      
      let uploadResponse= await fetch(apiUrl, options)
       let uploadResult = await uploadResponse.json()
  
        console.log(uploadResult.location)
        let message = {
          to: route.params.id,
          message: {type:"image",uri:uploadResult.location},
          from: user.id,
          userName: user.name,
          TimerTime: isTimerTime,
          timeoutTime:timeoutTime,
          data:{
              _id: create_UUID()+uploadResult.location,
              image: uploadResult.location,
              createdAt: new Date(),
              user: {
                _id: global.privateKey,
                name: global.name,
               
              },
            },
        };
       
        socket.emit("message", message);
      //  setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
        setUploadLoading(false)
        if(message.TimerTime){
          console.log('removing')
         setTimeout(() => {
        
       console.log(messages.filter(e=>e._id!==message.data._id))
         // setMessages(previousState =>
         //    ({ messages: previousState.filter(e => e._id !== message.data._id) }))
         setmessageIsBurning(true)
         setMessages(previousState =>
          (previousState.filter(e => e._id !== message.data._id)))
    
       setTimeout(() => {
        setmessageIsBurning(false)
       }, 500);
         }, message.timeoutTime*1000);
       }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetTokenFirst("userAuthToken");

      initSocketConnection();
    }, [])
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView>
     
    <View style={{ justifyContent: "space-between", height: "100%" }}>
      {isTimerButton ? (
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#d9d9d9',
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        height:'100%',
        shadowOffset: {
          height: 1,
          width: 1
        }}} >
          {/* <CDateTimePicker oncurrentDate={OnCurrentDate} /> */}
          <Text>Enter the time in seconds</Text>
         
          <TextInput
            placeholder="Timeout(sec)"
            style={styles.textInput}
            value={timeoutTime}
            keyboardType = 'numeric'
            onChangeText={setTimeoutTime}
             />
           {timeoutTime?<Text>You are setting timeout for {timeoutTime} seconds</Text>: <Text>Note:You must set timeout for ephemeral to work</Text>} 
               <TouchableOpacity
          activeOpacity={0.7}
        style={styles.buttonStyle}
          onPress={()=>setisTimerButton(!isTimerButton)}
        ><Text style={styles.buttonTextStyle} >Set </Text>
        </TouchableOpacity>
        </View>
      ) : null}
         <Modal  visible={isModalView} transparent={true} onRequestClose={() => {}} >
           <ImageViewer  onCancel={() => {
               setModalView(false)
              }} 
              imageUrls={[{ url: TempimageUri }]}
              
              renderHeader={() => (
                <TouchableOpacity
                  onPress={() => {
                    setModalView(false)
                  }}
                ><Text style={{color:'white',fontSize:18,fontWeight:'bold',textAlign:'right',marginTop:5,marginRight:10}}>X</Text></TouchableOpacity>
              )}
              enableSwipeDown /></Modal>

       <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      infiniteScroll ={true}
      loadEarlier={true}
      renderUsernameOnMessage
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
    
      user={{
        _id: global.privateKey,
        name:  global.name,
        avatar: global.imageUri
        }}
        isTyping={userTyping}
        renderMessageImage={(messages)=><View><TouchableWithoutFeedback onPress={()=>{setTempimageUri(messages.currentMessage.image);setModalView(true)}} >
          <View><Image source={{uri:messages.currentMessage.image}} 
          style={{width:300,height:300,backgroundColor:'#ffffff',borderRadius:10}} /></View>
        
         </TouchableWithoutFeedback>
     </View>}
       
        renderMessageAudio={(messages)=><AudioPlayer uri={messages.currentMessage.audio} type={"audio"} />}
        renderMessageVideo={(messages)=><AudioPlayer uri={messages.currentMessage.video} type={"video"} />}

        loadEarlier={chatLoading}
        isLoadingEarlier={chatLoading}
        // renderLoadEarlier={()=>{getMyChat}}
        renderBubble={renderBubble}
      
       
        renderComposer={()=>  <InputBox
          onFlamePresses={onFlamePresses}
          onStartTyping={startTyping}
          onPressFile={pickImage}
          onMessageSend={createMessage}
          onEmojiClick={handleStickers}
          microPhoneClickedIn={startRecording}
          microPhoneClickedOut={stopRecording}
          cameraPicker={cameraPickerHandler}
          microphoneLongPressStart={microphoneLongPressStart}
          microphoneLongPressOut={microphoneLongPressOut}
          
        />}
        renderFooter={()=>messageIsBurning?  <Image
          style={{width:30, height:30,margin:13}}
          source={flameFireGif} />:null
      }
    />

      {isTimerTime ? (
        <TouchableOpacity
          onPress={() => {
            setisTimerTime(!isTimerTime);
            setisTimerButton(false);
            setisTimerTime(null)
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              marginLeft: 10,
              padding:2,
              borderRadius: 5,
              backgroundColor: 'orange',
              flexDirection:'row'
            }}
          >
            <Text style={{color:Colors.light.background,fontSize:11,fontWeight:'bold'}}>Ephemeral  enabled</Text>
          {timeoutTime?<Text style={{color:Colors.light.background,fontSize:11,fontWeight:'bold'}}>,And Timeout set at {timeoutTime} sec</Text>:null}  
          </View>
        </TouchableOpacity>
      ) : null}
      {UploadLoading?  <Spinner
          visible={UploadLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />:null}
         {/* {chatLoading?  <Spinner
          visible={chatLoading}
          textContent={'Loading Previous Chats...'}
          textStyle={styles.spinnerTextStyle}
        />:null} */}
   {stickers? <View style={{flexDirection:'row',flexWrap:'wrap'}}>
   
    <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986241951.png')}}><Image 
    source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986241951.png'}}
     style={{width:90,height:90,margin:5}} /></TouchableOpacity> 

     <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986359841.png')}} ><Image 
    source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986359841.png'}}
     style={{width:90,height:90,margin:5}} /></TouchableOpacity>

       <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986439740.png')}} ><Image 
      source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986439740.png'}}
       style={{width:90,height:90,margin:5}} /></TouchableOpacity>

       <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986479152.png')}} ><Image 
      source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986479152.png'}} 
      style={{width:90,height:90,margin:5}} /></TouchableOpacity>
       <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986508247.png')}} ><Image 
      source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986508247.png'}} 
      style={{width:90,height:90,margin:5}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986586508.png')}} ><Image
       source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986586508.png'}} 
       style={{width:90,height:90,margin:5}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986621087.png')}} ><Image
       source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986621087.png'}} 
       style={{width:90,height:90,margin:5}} /></TouchableOpacity>
      <TouchableOpacity onPress={()=>{sendFilter('https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986645947.png')}} ><Image 
      source={{uri:'https://sky1999megabucket.s3.ap-south-1.amazonaws.com/1626986645947.png'}} 
      style={{width:90,height:90,margin:5}} /></TouchableOpacity>
    
     </View>:null}
    
    </View>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
