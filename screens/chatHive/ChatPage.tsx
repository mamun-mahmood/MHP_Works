import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hi, how are you?",
      sentBy: "me",
    },
    {
      message: "Heym I'm finejsdhsajdjsgdjsdgg!",
      sentBy: "user",
    },
    {
      message: "How are you, btw?",
      sentBy: "user",
    },
    {
      message: "I'm good. Wyd!",
      sentBy: "me",
    },
    {
      message: "Doing nothing",
      sentBy: "user",
    },
    {
      message: "Same here, haha",
      sentBy: "me",
    },
  ]);
  return (
    <View style={styles.container}>
      {messages.map((e) => (
        <View style={[e.sentBy === "me" ? styles.textRight : styles.textLeft, {marginTop: 10}]}>
          <MonoText  >{e.message}</MonoText>
          <MonoText style={{textAlign: 'right', fontSize: 8}} >5.00</MonoText>
        </View>
      ))}
      <View style={styles.messageSender}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: "grey",
            }}
          >
            <AntDesign name="plus" size={26} color="white" />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="Message..."
          style={{
            color: "white",
            borderWidth: 0.5,
            borderColor: "grey",
            width: "65%",
            paddingLeft: 10,
            borderRadius: 10,
            fontSize: 16,
          }}
          placeholderTextColor="white"
          multiline
        />
        <TouchableOpacity>
          <Feather name="camera" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="emoji-happy" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageSender: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "90%",
    bottom: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    marginLeft: "5%",
    borderRadius: 10,
    padding: 10,
  },
//   myMessage: {
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 10,
//   },
  textRight: {
    backgroundColor: "grey",
    width: "70%",
    marginLeft: "30%",
    padding: 5,
    borderRadius: 10
  },
  textLeft: {
    backgroundColor: "#A983B2",
    width: "70%",
    padding: 5,
    borderRadius: 10

  }
});
export default ChatPage;
