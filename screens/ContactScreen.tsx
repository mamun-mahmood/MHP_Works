import * as React from "react";
import { StyleSheet, FlatList ,View,Text} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ChatListItem from "../components/ChatListItem";

import InputBox from "../components/inputBox";
import NewMessageButton from "../components/NewMessageButton";
import ContactListItem from "../components/ContactListItem";
import users from "../data/Users";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

export default function ContactScreen() {
  
  const [users,setUsers]=useState([]);

  useEffect(()=>{
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
                global.contacts=userData.data.data.contact
                console.log(global.contacts,"8686")
                 
                } catch (e){
                  console.log(e)
                }
              }
              fetUsers();
  },[])
  return (
    <View style={styles.container}>
      <FlatList style={{width:'100%'}}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item)=>item.veroKey}
     />
  
  
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
