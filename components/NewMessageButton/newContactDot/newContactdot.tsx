// import React from "react";
// import { View,TouchableOpacity } from "react-native";
// import { AntDesign,MaterialIcons } from '@expo/vector-icons';
// import styles from './style'
// import { useNavigation } from "@react-navigation/core";
// const NewContactDot = () => {
//      const navigation =useNavigation();

//   const onClick =()=>{
//   navigation.navigate('Contacts')
//     }

//   return <TouchableOpacity onPress={onClick} ><View >
// <MaterialIcons name="contact-page" size={22} color="white" />
//   </View></TouchableOpacity>
// };

// export default NewContactDot;

//kunal

import { View, TouchableOpacity } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";

import { Text } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import * as SecureStore from "expo-secure-store";
const NewContactDot = () => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("Contacts");
  };
  const OpenSettings = () => {
    navigation.navigate("Settings");
  };
  const OpenContacts = () => {
    navigation.navigate("Contacts");
  };

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const logOut = () => {
    const handlelogout = async (key: string) => {
      await SecureStore.deleteItemAsync(key);
      // setUser(null);
      navigation.navigate("SignIn");
    };
    handlelogout("userAuthToken");
    hideMenu();
  };
  return (
    <TouchableOpacity
      onPress={showMenu}
      hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
    >
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <MaterialIcons name="contact-page" size={22} color="white" /> */}
        <Menu
          style={{ width: 180 }}
          visible={visible}
          anchor={
            <MaterialCommunityIcons
              name="dots-vertical"
              size={25}
              color={"white"}
            />
          }
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={hideMenu}>Account</MenuItem>
          <MenuItem onPress={hideMenu}>New Group</MenuItem>
          <MenuItem>Invite</MenuItem>
          <MenuItem onPress={OpenContacts}>Contacts</MenuItem>
          <MenuItem onPress={OpenSettings}>Settings</MenuItem>
          <MenuItem onPress={logOut}>Logout</MenuItem>
          <MenuDivider />
          {/* <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
        </Menu>
      </View>
    </TouchableOpacity>
  );
};

export default NewContactDot;
