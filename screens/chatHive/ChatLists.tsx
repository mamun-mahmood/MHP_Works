import React from "react";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Searchbar from "../../components/searchBar/Searchbar";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import ChatCard from "./ChatCard";

const ChatLists = () => {
  return (
    <>
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
    </>
  );
};
const styles = StyleSheet.create({
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
});
export default ChatLists;