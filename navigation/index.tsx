/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Octicons, MaterialCommunityIcons ,MaterialIcons,FontAwesome5,AntDesign} from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import MainTabNavigator from "./MainTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import ChatRoomScreen from "../screens/ChatRoom";
import styles from "../components/ChatListItem/style";
import ContactScreen from "../screens/ContactScreen";
import SignIn from "../screens/SignIn";
import CameraScreen from "../CameraScreen";
import NewMessageButton from "../components/NewMessageButton";
import NewContactDot from "../components/NewMessageButton/newContactDot/newContactdot";
import ProfileSetting from "../components/Profile";
import Searchbar from "../components/searchBar/Searchbar";
import CallScreen from "../screens/callScreen";
import VideoButton from "../components/VideoCallBox";
import SoapBox from "../screens/soapBox";


export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: "MegaHoot",
          headerLeft:()=>(
            <View><ProfileSetting /></View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 30,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              {/* <Octicons name="search" size={22} color={"white"} /> */}
              {/* <Searchbar /> */}
              {/* <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              /> */}
              <NewContactDot />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({
          title: route.params.name,
         
          headerRight: () => 
          <View style={{flexDirection:'row',width:100,justifyContent:'space-between',marginRight:10}}>
  
            <VideoButton />
            <MaterialIcons name="call" size={22} color={'white'} />
             <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />

          </View>,
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
       <Stack.Screen
        name="Contacts"
        component={ContactScreen}
     
       
      />
        <Stack.Screen
        name="Settings"
        component={SignIn}
     
       
      />
       <Stack.Screen
        name="SignIn"
        component={SignIn}
       
      />
        <Stack.Screen
        name="Camera"
        component={CameraScreen}
       
      />
       <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{ title: "Calling" }}
      />
        <Stack.Screen
        name="SoapBox"
        component={SoapBox}
       
      />
      
    </Stack.Navigator>
  );
}
