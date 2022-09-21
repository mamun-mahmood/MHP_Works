import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Appearance } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
// import styles from "./style";
import { useNavigation } from "@react-navigation/core";
const colorScheme = Appearance.getColorScheme();
const Searchbar = () => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("Contacts");
  };
  const [color, setColor] = useState(
    useEffect(() => {
      if (colorScheme === "light") {
        // Use dark color scheme
        setColor("black");
      }
      if (colorScheme === "dark") {
        // Use dark color scheme
        setColor("white");
      }
    }, [])
  );

  return (
    <TouchableOpacity onPress={onClick}>
      <View>
        <Octicons name="search" size={22} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default Searchbar;
