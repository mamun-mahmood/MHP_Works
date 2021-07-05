import React from "react";
import { Text, View, Image,TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItemProps) => {
  const { chatRoom } = props;
  const navigation =useNavigation();
  const user = chatRoom;

  const onClick =()=>{
   navigation.navigate('ChatRoom',{id:user.veroKey,name:user.name,imageUri:user.imageUri})
  }
  return (
    <TouchableWithoutFeedback onPress={onClick}> 
    
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: user.imageUri }} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text numberOfLines={1} style={styles.lastMessage}>
            {chatRoom.veroKey}
          </Text>
        </View>
      </View>

      <Text style={styles.time}>
"yesterday"
{/* {moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}    */}
          </Text>
    </View>
    
    </TouchableWithoutFeedback>
   
  );
};

export default ChatListItem;
