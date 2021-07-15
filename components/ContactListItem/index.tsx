import React from "react";
import { Text, View, Image,TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  const navigation =useNavigation();
 

  const onClick =()=>{
  console.log("clicked ")
  }
  return (
    <TouchableWithoutFeedback onPress={onClick}> 
    
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: user.ProfilePic }} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.status}>{user.veroKey}</Text>
        </View>
      </View>

    </View>
    </TouchableWithoutFeedback>
   
  );
};

export default ContactListItem;
