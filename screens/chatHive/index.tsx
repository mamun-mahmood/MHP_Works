import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Searchbar from "../../components/searchBar/Searchbar";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import ChatCard from "./ChatCard";
import { Ionicons } from "@expo/vector-icons";
import ChatLists from "./ChatLists";
import { useState } from "react";

const ChatHiveIndex = () => {
  const [tab, setTab] = useState("ChatLists");
  return (
    <View style={styles.container}>
      {tab === "ChatLists" && <ChatLists />}
      {/* Bottom bar for page navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Ionicons
            style={tab === "Calls" && styles.activeBorder}
            name="call-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={tab === "Contacts" && styles.activeBorder}
            name="people-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 50,
              borderWidth: 0.5,
              borderColor: "grey",
            }}
          >
            <AntDesign name="plus" size={50} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            style={tab === "ChatLists" && styles.activeBorder}
            name="chatbox-outline"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            style={tab === "Setting" && styles.activeBorder}
            name="settings"
            size={30}
            color="white"
          />
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
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderColor: "grey",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  activeBorder: {
    borderWidth: 2,
    borderBottomColor: "grey",
  },
});
export default ChatHiveIndex;
