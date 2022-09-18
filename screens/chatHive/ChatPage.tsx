import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
    {
      message: "Ok",
      sentBy: "me",
    },
  ]);
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 60 }}>
        {messages.map((e, index) => (
          <TouchableOpacity onLongPress={() => alert("Actions...")} key={index}>
            <View
              style={[
                e.sentBy === "me" ? styles.textRight : styles.textLeft,
                { marginTop: 10 },
              ]}
            >
              <MonoText>{e.message}</MonoText>
              <MonoText style={{ textAlign: "right", fontSize: 10 }}>
                5.00 Sent
              </MonoText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.messageSender}>
        {/* <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#A983B2",
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: "grey",
            }}
          >
            <AntDesign name="plus" size={26} color="white" />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity>
          <Feather name="camera" size={26} color="#A983B2" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="emoji-happy" size={26} color="#A983B2" />
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
          placeholderTextColor="#A983B2"
          multiline
        />
        <TouchableOpacity>
          <Feather name="send" size={26} color="#A983B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageSender: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "95%",
    bottom: 10,
    borderWidth: 0.5,
    borderColor: "grey",
    marginLeft: "5%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.32)",
  },
  textRight: {
    backgroundColor: "#A983B2",
    maxWidth: "70%",
    marginLeft: "30%",
    padding: 5,
    borderRadius: 10,
  },
  textLeft: {
    backgroundColor: "rgba(0, 0, 0, 0.32)",
    maxWidth: "70%",
    padding: 5,
    borderRadius: 10,
  },
});
export default ChatPage;
