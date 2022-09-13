import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { GiftedAvatar } from "react-native-gifted-chat";
import { Avatar } from "react-native-paper";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";

const ChatCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatPage");
      }}
    >
      <View style={styles.container}>
        <View style={{ flex: 0.5 }}>
          <Avatar.Image size={50} source={{}} />
        </View>
        <View style={{ marginLeft: -30, flex: 1 }}>
          <MonoText style={styles.text1}>User Name</MonoText>
          <MonoText style={styles.text2}>Messagess</MonoText>
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <MonoText style={{ fontSize: 10 }}>Timestamp</MonoText>
          <MonoText style={{ fontSize: 10 }}>4</MonoText>
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
    fontSize: 18,
  },
  text2: {
    // color: Colors.light.background
    fontSize: 14,
  },
});
export default ChatCard;
