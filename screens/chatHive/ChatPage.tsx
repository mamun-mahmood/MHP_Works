import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";

const ChatPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messageSender}>
        {/* <View style={{ display: "flex", flexDirection: "row" }}> */}
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
            borderRadius: 10
          }}
          placeholderTextColor="white"
          multiline
        />
        {/* </View> */}
        {/* <View style={{ display: "flex", flexDirection: "row" }}> */}
        <TouchableOpacity style={{ marginRight: 0 }}>
          <Feather name="camera" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="emoji-happy" size={26} color="white" />
        </TouchableOpacity>
        {/* </View> */}
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
});
export default ChatPage;
