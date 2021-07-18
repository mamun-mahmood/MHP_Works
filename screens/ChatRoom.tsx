import React, { useEffect ,useCallback} from "react";
import {
  Text,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";

import { useRoute } from "@react-navigation/core";
// import chatRoomData from '../data/Chats'
import AudioPlayer from "../components/audioPlayer";
import ChatMessage from "../components/chatMessage";
import { View } from "react-native";
import InputBox from "../components/inputBox";
import { Audio } from "expo-av";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.testDb");
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../components/ChatListItem/style";
import Spinner from 'react-native-loading-spinner-overlay';

import socket, { startSocket } from "../socket";
import { color } from "react-native-reanimated";
import { CDateTimePicker } from "../components/Timer/datetimePicker";
import DelayTimer from "../components/Timer";
import Colors from "../constants/Colors";
import axios from "axios";
import { GiftedChat } from 'react-native-gifted-chat'
const ChatRoomScreen = () => {
  const route = useRoute();
  const [sound, setSound] = useState();
  const [userChatData, setUserChatData] = useState([
    { veroKey: route.params.id, name: route.params.name },
  ]);
  const [selectedUserIndex, setselectedUserIndex] = useState(null);
  const [user, setUser] = useState();
  const [MChatMessage, setMChatMessage] = useState([]);
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState();
  const [setDBchat, setsetDBchat] = useState();
  const [userTyping, setuserTyping] = useState(false);
  const [isTimerButton, setisTimerButton] = useState(false);
  const [UploadLoading, setUploadLoading] = useState(false);
  const [chatLoading, setchatLoading] = useState(false);
  
  const [isTimerTime, setisTimerTime] = useState(false);
  const [messages, setMessages] = useState([]);
 
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
   axios.post(`https://api.megahoot.net/api/users/getMyChatData`,{
     to:route.params.id,
     from:global.privateKey
   }).then((res)=>{
    //  console.log(res.data)
     res.data.message.forEach((d)=>{

      let myChatData=JSON.parse(d.chat)
      console.log(myChatData)
      setMessages(previousMessages => GiftedChat.append(previousMessages, myChatData))
      
     })
   setchatLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setchatLoading(false)
    })
}

  useEffect(() => {
    setchatLoading(true)
    //  handleDeleteToken(route.params.id)
   getMyChat()
  }, [])

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
          setuserTyping(true);
        } else {
          setuserTyping(false);
          setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
          // handleSetChat(route.params.id,message.data)
          // newItem(messageData)
          // handleSetChat(route.params.id,messageData)
          // playYouSound;
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
    setupSocketListeners();
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
      data:{
          _id:mid ,
          text: text,
          createdAt: new Date(),
          user: {
            _id: global.privateKey,
            name: global.name,
           
          },
        },
      
    };
    console.log(message.TimerTime)
    socket.emit("message", message);
     setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
    // newItem(message)
    // console.log(MChatMessage)
    //  handleSetChat(route.params.id,message.data)
  };

  const createMessageEmoji = (text) => {
    let message = {
      to: route.params.id,
      message: {
        type: "emoji",
        text: text,
        date: +new Date(),
        className: "message",
      },
      from: global.id,
      userName: global.name,
      TimerTime: isTimerTime,
    };

   
    setMChatMessage((old) => [...old, message]);
 
    socket.emit("message", message);
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
    // socket.emit('message', message)
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
        data:{
            _id: create_UUID(),
            audio: uploadResult.location,
            createdAt: new Date(),
            user: {
              _id: global.privateKey,
              name: global.name,
             
            },
          },
      };
  
      socket.emit("message", message);
       setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
      setUploadLoading(false)
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

  //   const emojiClickHandler=()=>{
  // console.log('emoji')
  //   }
  const createFormData = (photo, body = {}) => {
    const data = new FormData();
  
    data.append('photo', {
      name: 'sky',
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
  
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
  
    return data;
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64:true
      
    });

    // console.log(result);

    if (!result.cancelled) {
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
     setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
      setUploadLoading(false)

}

 
    }


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
      base64: true,
    });
    // Explore the result
    console.log(result);

    if (!result.cancelled) {
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
       setMessages(previousMessages => GiftedChat.append(previousMessages, message.data))
        setUploadLoading(false)
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

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync(); }
  //     : undefined;
  // }, [sound]);

  return (
    <View style={{ justifyContent: "space-between", height: "100%" }}>
      {isTimerButton ? (
        <View>
          {/* <Button      title="5 sec"
        onPress= {()=>{setisTimerTime('5s'),setisTimerButton(!isTimerButton)}} />
         <Button      title="10 sec"
        onPress= {()=>{setisTimerTime('10s'),setisTimerButton(!isTimerButton)}} />
         <Button      title="30 sec"
        onPress= {()=>{setisTimerTime('30s'),setisTimerButton(!isTimerButton)}} />
         <Button      title="1 min"
        onPress= {()=>{setisTimerTime('1m'),setisTimerButton(!isTimerButton)}} />
         <Button      title="5 min"
        onPress= {()=>{setisTimerTime('5m'),setisTimerButton(!isTimerButton)}} />
         <Button      title="30 min sec"
        onPress= {()=>{setisTimerTime('30m'),setisTimerButton(!isTimerButton)}} />
         <Button      title="1 hour"
        onPress= {()=>{setisTimerTime('1h'),setisTimerButton(!isTimerButton)}} /> */}
          <CDateTimePicker oncurrentDate={OnCurrentDate} />
        </View>
      ) : null}

      {userTyping ? (
        <View>
          <Text style={styles.username}>Typing...</Text>
        </View>
      ) : null}
      {/* <FlatList
        data={MChatMessage}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ChatMessage
            hisid={route.params.id}
            privateKey={user.id}
            message={item}
          />
        )}
        inverted
        contentContainerStyle={{ flexDirection: "column-reverse" }}
      /> */}
       <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      infiniteScroll ={true}
      loadEarlier={true}
      // onLongPress={()=>{console.warn('presses')}}
      renderUsernameOnMessage
      user={{
        _id: global.privateKey,
        name:  global.name,
        // avatar: global.imageUri
        }}
        renderMessageAudio={(messages)=><AudioPlayer uri={messages.currentMessage.audio} />}
      
        renderComposer={()=>  <InputBox
          onFlamePresses={onFlamePresses}
          onStartTyping={startTyping}
          onPressFile={pickImage}
          onMessageSend={createMessage}
          onMessageSendEmoji={createMessageEmoji}
          microPhoneClickedIn={startRecording}
          microPhoneClickedOut={stopRecording}
          cameraPicker={cameraPickerHandler}
          microphoneLongPressStart={microphoneLongPressStart}
          microphoneLongPressOut={microphoneLongPressOut}
          
        />}
    />

      {isTimerTime ? (
        <TouchableOpacity
          onPress={() => {
            setisTimerTime(!isTimerButton);
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              marginLeft: 10,
              padding:2,
              borderRadius: 5,
              backgroundColor: 'orange',
            }}
          >
            <Text style={{color:Colors.light.background,fontSize:11,fontWeight:'bold'}}>Ephemeral  enabled</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      {UploadLoading?  <Spinner
          visible={UploadLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />:null}
         {chatLoading?  <Spinner
          visible={chatLoading}
          textContent={'Loading Previous Chats...'}
          textStyle={styles.spinnerTextStyle}
        />:null}
    
    </View>
  );
};

export default ChatRoomScreen;
