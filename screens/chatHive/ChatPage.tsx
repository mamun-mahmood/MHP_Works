import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Fragment, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import { getChatDataPrivate, getUser } from "./DataFetcher";
import moment from "moment";

const ChatPage = ({ route }: any) => {
  const { chatname, imgSrc, userFullName } = route.params;
  const [messages, setMessages] = useState([
    {
      chatname: null,
      message: "",
      timestamp: null,
      isImage: false,
      isVideo: false,
      isEmoji: false,
      isSticker: false,
    },
  ]);
  useEffect(() => {
    if (!messages[0].chatname) {
      getChatDataPrivate(chatname, userFullName, setMessages);
    }
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 60 }}>
        {messages.map((e, index) => (
          <Fragment key={index}>
            {e.isImage && (
              <TouchableOpacity onLongPress={() => alert("Actions...")}>
                <View
                  style={[
                    e.chatname === userFullName
                      ? styles.textRight
                      : styles.textLeft,
                    { marginTop: 10, padding: 10 },
                  ]}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: e.message,
                    }}
                  />
                  <MonoText style={{ textAlign: "right", fontSize: 10 }}>
                    {e.timestamp}
                  </MonoText>
                </View>
              </TouchableOpacity>
            )}
            {!e.isImage &&
              !e.isSticker &&
              !e.isEmoji &&
              !e.isVideo && (
                <TouchableOpacity onLongPress={() => alert("Actions...")}>
                  <View
                    style={[
                      e.chatname === userFullName
                        ? styles.textRight
                        : styles.textLeft,
                      { marginTop: 10 },
                    ]}
                  >
                    <MonoText>{e.message}</MonoText>
                    <MonoText style={{ textAlign: "right", fontSize: 10 }}>
                      {e.timestamp}
                    </MonoText>
                  </View>
                </TouchableOpacity>
              )}
          </Fragment>
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
    backgroundColor: "#1b1b23",
    maxWidth: "70%",
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
export default ChatPage;
