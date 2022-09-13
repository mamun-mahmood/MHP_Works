import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Searchbar from "../../components/searchBar/Searchbar";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import ChatCard from "./ChatCard";
import { Ionicons } from "@expo/vector-icons";

const ChatHiveIndex = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chatHolder}>
        <MonoText style={styles.text}>Chats</MonoText>
        <TouchableOpacity>
          <View>
            <Octicons name="search" size={22} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      {/* chat listing */}
      <ScrollView>
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </ScrollView>
      {/* Bottom bar for page navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="people-outline" size={30} color="white" />
        </TouchableOpacity>
        {/* <View style={{  top: "-75%", left: "43%" }}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "black", 
                borderRadius: 50,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "grey",
              }}
            >
              <AntDesign name="plus" size={50} color="white" />
            </View>
          </TouchableOpacity>
        </View> */}
        <TouchableOpacity>
          <Ionicons name="chatbox-outline" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="settings" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  chatHolder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
  text: {
    // color: Colors.light.background
    fontSize: 22,
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
    borderTopWidth: 0.5,
    borderColor: "grey",
    // height: 50,
  },
});
export default ChatHiveIndex;
