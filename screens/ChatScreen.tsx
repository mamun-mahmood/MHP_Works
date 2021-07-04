import * as React from "react";
import { StyleSheet, FlatList,View,Text} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ChatListItem from "../components/ChatListItem";

import ChatRooms from "../data/ChatRooms";
import InputBox from "../components/inputBox";
import NewMessageButton from "../components/NewMessageButton";
export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <FlatList style={{width:'100%'}}
        data={ChatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item)=>item.id}
     />
     <NewMessageButton />
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
