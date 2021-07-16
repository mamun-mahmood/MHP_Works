import React, { useEffect } from "react";
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

import socket, { startSocket } from "../socket";
import { color } from "react-native-reanimated";
import { CDateTimePicker } from "../components/Timer/datetimePicker";
import DelayTimer from "../components/Timer";
import Colors from "../constants/Colors";

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
  const [isTimerTime, setisTimerTime] = useState();
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
    await SecureStore.deleteItemAsync(key).then;
    let chat = MChatMessage;
    chat.push(value);
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

      //  console.log(mydata)

      mydata ? setMChatMessage(mydata) : console.log("no sky");
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
          setMChatMessage((old) => [...old, messageData]);
          // newItem(messageData)
          // handleSetChat(route.params.id,messageData)
          playYouSound;
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
  const createMessage = (text) => {
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
    };

    socket.emit("message", message);
    setMChatMessage((old) => [...old, message]);

    // newItem(message)
    // console.log(MChatMessage)
    //  handleSetChat(route.params.id,message)
  };

  const onFlamePresses = () => {
    setisTimerButton(!isTimerButton);
  };

  const OnCurrentDate = (data) => {
    setisTimerTime(data);
    setisTimerButton(false);
    console.log(data);
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
    let message = {
      to: route.params.id,
      message: { audioUri: uri },
      from: user.id,
      userName: user.name,
    };
    setMChatMessage((old) => [...old, message]);
    socket.emit("message", message);
  }

  const microPhoneHandler = () => {
    startRecording();
  };

  //   const emojiClickHandler=()=>{
  // console.log('emoji')
  //   }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [9, 16],
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      let message = {
        to: route.params.id,
        message: result,
        from: global.id,
        userName: global.name,
      };
      setMChatMessage((old) => [...old, message]);
      socket.emit("message", message);
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
      base64: true,
      aspect: [9, 16],
    });
    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
      let message = {
        to: route.params.id,
        message: result,
        from: user.id,
        userName: user.name,
      };
      //  setMChatMessage(old => [...old,message])
      socket.emit("message", message);
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
      <FlatList
        data={MChatMessage}
        renderItem={({ item }) => (
          <ChatMessage
            hisid={route.params.id}
            privateKey={user.id}
            message={item}
            keyExtractor={(item) => item}
          />
        )}
        inverted
        contentContainerStyle={{ flexDirection: "column-reverse" }}
      />

      {isTimerTime ? (
        <TouchableOpacity
          onPress={() => {
            setisTimerTime(null);
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
      <InputBox
        onFlamePresses={onFlamePresses}
        onStartTyping={startTyping}
        onPressFile={pickImage}
        onMessageSend={createMessage}
        microPhoneClickedIn={startRecording}
        microPhoneClickedOut={stopRecording}
        cameraPicker={cameraPickerHandler}
      />
    </View>
  );
};

export default ChatRoomScreen;
