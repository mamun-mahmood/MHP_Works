import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Image,SafeAreaView,AsyncStorage } from "react-native";
import styles from "../components/ContactListItem/style";
import Colors from "../constants/Colors";
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useFocusEffect } from "@react-navigation/native";

import * as SecureStore from 'expo-secure-store';
export default function SignIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [User, setUser] = useState();
  const [myToken,setMyToken]=useState({});
  
  // async function storeToken(user) {
  //   try {
  //      await AsyncStorage.setItem("userData", JSON.stringify(user));
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // }
  // async function getToken() {
  //   try {
  //     let userData = await AsyncStorage.getItem("userData");
  //     let data = JSON.parse(userData);
     
  //     setMyToken({privateKey:data.result.privateKey,name:data.result.name})
  //     console.log(myToken.privateKey,"token by local");
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // }

  useFocusEffect(
    React.useCallback(() => {
      // getToken()
     
    }, [])
  );
  const handleSetToken = async (key,value) => {
    SecureStore.setItemAsync(key, value).then;
    setMyToken(value);
  };

  const handleGetToken = async (key) => {
    const tokenFromPersistentState = await SecureStore.getItemAsync(
     key,
    );
    if (tokenFromPersistentState) {
      const mydata = JSON.parse(tokenFromPersistentState)
     setUser(mydata)
    }
  };
  const signInHandler = () => {

   
 axios.post(` https://api.megahoot.net/api/users/login`, {
        email: Email,
        password: Password,
      })
      .then((res) => {
        const data = res.data
        var decoded = jwt_decode(data.token);
      if(decoded){
        const data = JSON.stringify(decoded.result)
setUser(decoded.result)
// global.privateKey=decoded.result.privateKey
// global.name=decoded.result.firstName +" "+decoded.result.lastName

handleSetToken('userAuthToken',data)
handleGetToken('userAuthToken')

      } 
       
      // handle success
    //  alert(JSON.stringify(decoded.result))
    //   saveData('userData',JSON.stringify(decoded.result.id))
   
    
    })
    .then(()=>{setIsLoggedIn(true)})
    .catch(function (error) {
      // handle error
      alert(error.message);
    });

     
  
  };
  const logOut = () => {
    setIsLoggedIn(!isLoggedIn)
   };

  //  useEffect(() => {
  //   handleGetToken('userAuthToken')
  //  }, [])

   useFocusEffect(
    React.useCallback(() => {
      handleGetToken('userAuthToken')
    }, [User])
  );
  return (
      <SafeAreaView ><View 
      
      style={{ justifyContent: "center",
    alignItems: "center",backgroundColor: !User?'#e8dcef':'white',height:'100%'}}>
      {!User ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:'white',
            width:'80%',
            borderRadius:10
           
           
          }}
        >
          <View style={{justifyContent:'center',alignItems:'center'}}>
         
            <Text style={{color:Colors.light.tint,fontWeight:'bold',margin:10,fontSize:15}}>MegaHoot</Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../assets/images/logo.png")}
            ></Image>
          </View>
          <View style={{height:'50%'}}>
          <Text style={{color:Colors.light.tint,fontWeight:'bold',margin:10,fontSize:15,textAlign:'center'}}>Login Now </Text>
            <TextInput
            style={{width:200,margin:10}}
              placeholder="Enter Email"
            
              value={Email}
              onChangeText={setEmail}
            />
            <TextInput
            secureTextEntry={true}
             style={{width:200,margin:10}}
              placeholder="Enter Password"
             
              value={Password}
              onChangeText={setPassword}
            />
            <Button
              title="Sign In"
              color={Colors.light.tint}
              onPress={signInHandler}
            />
          </View>
        </View>
      ) : (
          
        <View style={{flex:1,width:'100%'}}>
            {User.privateKey? <View style={{flexDirection:'row',padding:10,margin:10}} >
                <Image source={{ uri: User.ProfilePic }} style={styles.avatar} />
                <View style={styles.midContainer} >
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Text style={styles.username}>{User.firstName?`${User.firstName} ${User.lastName}`:null}</Text>
                    <AntDesign name="edit" size={18} color="black" /></View>
                 
         <Text style={styles.time}>{User.privateKey}</Text></View>
         <View style={{marginLeft:'auto',justifyContent:'center'}}>
             <TouchableWithoutFeedback onPress={logOut}>
                <AntDesign name="logout" size={24} color={Colors.light.tint}/>   
             </TouchableWithoutFeedback>
           </View>
            </View>
           :null}
           
        </View>
      )}
    </View>
 </SafeAreaView>
     );
}
