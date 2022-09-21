import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { GiftedAvatar } from "react-native-gifted-chat";
import { Avatar } from "react-native-paper";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import moment from "moment";

const ChatCard = ({ chat, userFullName }: any) => {
  const navigation = useNavigation();
  const BaseURL = "https://soapboxapi.megahoot.net";
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatPage", {
          chatname: chat.chatFrom,
          imgSrc: `${BaseURL}/profile-pictures/${chat.chat.profilePic}`,
          userFullName: userFullName,
        });
      }}
    >
      <View style={styles.container}>
        <View style={{ flex: 0.5 }}>
          <Avatar.Image
            size={60}
            source={{
              uri: `${BaseURL}/profile-pictures/${chat.chat.profilePic}`,
            }}
          />
        </View>
        <View style={{ flex: 1.5 }}>
          <MonoText style={styles.text1}>{chat.chatFrom}</MonoText>
          <MonoText style={styles.text2}>{chat.chat.message}</MonoText>
        </View>
        <View
          style={{
            flex: 0.5,
            display: "flex",
            alignItems: "center",
            borderColor: "grey",
            borderLeftWidth: 0.5,
            marginRight: -20
          }}
        >
          <MonoText style={{ fontSize: 12 }}>
            {moment(chat.createdAt).fromNow()}
          </MonoText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
  text1: {
    // color: Colors.light.background
    fontSize: 16,
  },
  text2: {
    // color: Colors.light.background
    fontSize: 12,
    marginTop: 5,
  },
});
export default ChatCard;
