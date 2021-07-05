import * as React from "react";
import { StyleSheet, FlatList,View,Text} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ChatListItem from "../components/ChatListItem";
import axios from 'axios';
import ChatRooms from "../data/ChatRooms";
import InputBox from "../components/inputBox";
import NewMessageButton from "../components/NewMessageButton";
import { useState } from "react";
import { useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
export default function ChatScreen() {
  const [users,setUsers]=useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetUsers=async ()=>{
        try{
           const userData= await axios.post('https://api.megahoot.net/api/contact/contact-list/',{
             veroKey:global.privateKey,
             name:global.name
           })

           const contactParse = JSON.parse(userData.data.data.contact)
          //  contactParse.forEach((contact) => users.push(contact))
       
           console.log(userData.data.data,users)
          setUsers(contactParse)
        global.contacts=userData.data.data
        console.log(global.contacts)
         
        } catch (e){
          console.log(e)
        }
      }
      fetUsers();
    }, [global.privateKey])
  );

  // useEffect(()=>{
  //             const fetUsers=async ()=>{
  //               try{
  //                  const userData= await axios.post('https://api.megahoot.net/api/contact/contact-list/',{
  //                    veroKey:global.privateKey,
  //                    name:global.name
  //                  })

  //                  const contactParse = JSON.parse(userData.data.data.contact)
  //                 //  contactParse.forEach((contact) => users.push(contact))
               
  //                  console.log(userData.data.data,users)
  //                 setUsers(contactParse)
  //               global.contacts=userData.data.data
  //               console.log(global.contacts)
                 
  //               } catch (e){
  //                 console.log(e)
  //               }
  //             }
  //             fetUsers();
              
  // },[navigation])

  
  return (
    <View style={styles.container}>
       {global.privateKey? <FlatList style={{width:'100%'}}
        data={users}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item)=>item.veroKey}
     />:<Text>Please Login To Continue</Text>}
     
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
