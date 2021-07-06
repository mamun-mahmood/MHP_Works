import moment from "moment";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Message } from "../../types";
import styles from "./style";

import { useState } from 'react'

// export type ChatMessageProps = {
//   message: Message;
// };

const ChatMessage = (props) => {

console.log(props.message,"sky")
  const { message } = props;

  const isMyMessage = () => {
    return message.from ===global.privateKey;
  };

  
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#e8dcef" : "white",
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.userName}</Text>}
        {isMyMessage() && <Text style={styles.name}>You</Text>}
        <Text style={styles.message}>{message.message.text}</Text>
        <Text style={styles.time}>{moment(message.message.date).fromNow()}</Text>
      </View>
    </View>
  );
};

export default ChatMessage;
