import React, { useState } from "react";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Searchbar from "../../components/searchBar/Searchbar";
import { MonoText } from "../../components/StyledText";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import ChatCard from "./ChatCard";

const ChatLists = ({user}) => {
  const [chats, setChats] = useState([
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    {
  
    },
    
  ])
  return (
    <>
      <View style={styles.chatHolder}>
        <MonoText style={styles.text}>Chats</MonoText>
        {/* <TouchableOpacity>
          <View>
            <Octicons name="search" size={22} color={"white"} />
          </View>
        </TouchableOpacity> */}
        <Searchbar/>
      </View>
      {/* chat listing */}
      <ScrollView>
        {chats.map((e, index) => <ChatCard key={index} index={index} />)}
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
