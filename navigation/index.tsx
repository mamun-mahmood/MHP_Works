// /**
//  * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
//  * https://reactnavigation.org/docs/getting-started
//  *
//  */
// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import * as React from "react";
// import { Octicons, MaterialCommunityIcons ,MaterialIcons,FontAwesome5,AntDesign} from "@expo/vector-icons";
// import { Image, Text, View } from "react-native";
// import { ColorSchemeName } from "react-native";
// import Colors from "../constants/Colors";

// import NotFoundScreen from "../screens/NotFoundScreen";
// import { RootStackParamList } from "../types";
// import MainTabNavigator from "./MainTabNavigator";
// import LinkingConfiguration from "./LinkingConfiguration";
// import ChatRoomScreen from "../screens/ChatRoom";
// import styles from "../components/ChatListItem/style";
// import ContactScreen from "../screens/ContactScreen";
// import SignIn from "../screens/SignIn";
// import CameraScreen from "../CameraScreen";
// import NewMessageButton from "../components/NewMessageButton";
// import NewContactDot from "../components/NewMessageButton/newContactDot/newContactdot";
// import ProfileSetting from "../components/Profile";
// import Searchbar from "../components/searchBar/Searchbar";
// import CallScreen from "../screens/callScreen";
// import VideoButton from "../components/VideoCallBox";
// import SoapBox from "../screens/soapBox";
// import individualContact from "../screens/individualContact";
// import Register from "../screens/Register";
// import SignInKunal from "../screens/SignInScreen";
// import SignInScreen from "../screens/SignInScreen";
// import ProfileEdit from "../screens/ProfileEdit";

// export default function Navigation({
//   colorScheme,
// }: {
//   colorScheme: ColorSchemeName;
// }) {
//   return (
//     <NavigationContainer
//       linking={LinkingConfiguration}
//       theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//     >
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }

// // A root stack navigator is often used for displaying modals on top of all other content
// // Read more here: https://reactnavigation.org/docs/modal
// const Stack = createStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: Colors.light.tint,
//           shadowOpacity: 0,
//           elevation: 0,
//         },
//         headerTintColor: Colors.light.background,
//         headerTitleAlign: "left",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     >
//       <Stack.Screen
//         name="Root"
//         component={MainTabNavigator}
//         options={{
//           title: "MegaHoot",
//           headerLeft:()=>(
//             <View><ProfileSetting /></View>
//           ),
//           headerRight: () => (
//             <View
//               style={{
//                 flexDirection: "row",
//                 width: 30,
//                 justifyContent: "space-between",
//                 marginRight: 10,
//               }}
//             >
//               {/* <Octicons name="search" size={22} color={"white"} /> */}
//               {/* <Searchbar /> */}
//               {/* <MaterialCommunityIcons
//                 name="dots-vertical"
//                 size={22}
//                 color={"white"}
//               /> */}
//               <NewContactDot />
//             </View>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="ChatRoom"
//         component={ChatRoomScreen}
//         options={({ route }) => ({
//           title: route.params.name?route.params.name:'Chat',

//           headerRight: () =>
//           <View style={{flexDirection:'row',width:100,justifyContent:'space-between',marginRight:10}}>

//             <VideoButton />
//             <MaterialIcons name="call" size={22} color={'white'} />
//              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />

//           </View>,
//         })}
//       />
//       <Stack.Screen
//         name="NotFound"
//         component={NotFoundScreen}
//         options={{ title: "Oops!" }}
//       />
//        <Stack.Screen
//         name="Contacts"
//         component={ContactScreen}

//       />
//         <Stack.Screen
//         name="Settings"
//         component={SignInScreen}

//       />
//         <Stack.Screen
//         name="Register"
//         component={Register}
//         options={({ route }) => ({
//           title: 'Register Now',
//         })}

//       />
//        <Stack.Screen
//         name="SignIn"
//         component={SignInScreen}
//         options={({ route }) => ({
//           title: 'SignIn',
//         })}

//       />
//         <Stack.Screen
//         name="Camera"
//         component={CameraScreen}

//       />
//        <Stack.Screen
//         name="CallScreen"
//         component={CallScreen}
//         options={{ title: "Calling" }}
//       />
//         <Stack.Screen
//         name="SoapBox"
//         component={SoapBox}

//       />

//          <Stack.Screen
//            name="individualContact"
//          options={({ route }) => ({
//           title: route.params.name?route.params.name:'Contact',
//         })}
//         component={individualContact}

//       />

//     </Stack.Navigator>
//   );
// }

//Kunal khanna

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
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
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
import individualContact from "../screens/individualContact";
import Register from "../screens/Register";
import SignInKunal from "../screens/SignInScreen";
import SignInScreen from "../screens/SignInScreen";
import ProfileEdit from "../screens/ProfileEdit";
import ChatPage from "../screens/chatHive/ChatPage";
import { Avatar } from "react-native-paper";

export default function Navigation({
  colorScheme,
  user,
  userData,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator user={user} userData={userData} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator({ user, userData }) {
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
      initialRouteName={`${user ? "Root" : "SignIn"}`}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: `${userData?.name ? userData.name : "MegaHoot"}`,
          headerLeft: () => (
            <View>
              <ProfileSetting userData={userData} />
            </View>
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
          title: route.params.name ? route.params.name : "Chat",

          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 100,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <VideoButton />
              <MaterialIcons name="call" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen name="Contacts" component={ContactScreen} />
      <Stack.Screen name="Settings" component={SignInScreen} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ route }) => ({
          title: "Register Now",
        })}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={({ route }) => ({
          title: "SignIn",
        })}
      />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{ title: "Calling" }}
      />
      <Stack.Screen name="SoapBox" component={SoapBox} />

      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="individualContact"
        options={({ route }) => ({
          title: route.params.name ? route.params.name : "Contact",
        })}
        component={individualContact}
      />
      <Stack.Screen
        name="ChatPage"
        component={ChatPage}
        options={{
          title: "User Name",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Avatar.Image size={40} source={{}} />
            </View>
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
    </Stack.Navigator>
  );
}
