import * as React from "react";
import { StyleSheet, FlatList ,View,Text, TextInput,TouchableOpacity} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ChatListItem from "../components/ChatListItem";

import InputBox from "../components/inputBox";
import NewContactButton from "../components/NewContactButton/index";
import ContactListItem from "../components/ContactListItem";
import users from "../data/Users";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import Colors from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";

export default function ContactScreen() {
   
const [FormVisible, setFormVisible] = useState(false)
  const [users,setUsers]=useState([]);
  const [cname,setCname]=useState('');
  const [cveroKey,setCveroKey]=useState('');

  const addContactHandler=()=>{
    const contactveroKey = global.privateKey
    {contactveroKey?
      
      axios
      .post(`https://api.megahoot.net/api/contact/add-contact`, {
        contactveroKey: cveroKey,
        veroKey: contactveroKey,
        name:cname,
        profileImage: null,
        blocked: false,
        Relation: '',
        contactStatus: true,
      })
      .then((res) => {
      console.info('Succesfylly added contact')
       setFormVisible(!FormVisible)
      
        // this.fetchContactList()
      })
      .catch(function (error) {
        console.log(error)
        alert('Error in fetcing user')
      })
      :console.error('Please login first')}
    
  }


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
          
        global.contacts=userData.data.data.contact
        console.log(global.contacts,"8686")
         
        } catch (e){
          console.log(e)
        }
      }
      fetUsers();
    }, [global.privateKey,FormVisible])
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
  //               global.contacts=userData.data.data.contact
  //               console.log(global.contacts,"8686")
                 
  //               } catch (e){
  //                 console.log(e)
  //               }
  //             }
  //             fetUsers();
  // },[])
  return (
    <View style={styles.container}>
      {FormVisible?<View style={styles.container}>
        
        <Text style={styles.title}>New Contact</Text>
        <TextInput
            placeholder="Enter Name"
            style={styles.textInput}
            value={cname}
            onChangeText={setCname}
             />
               <TextInput
            placeholder="Enter VeroKey"
            style={styles.textInput}
            value={cveroKey}
            onChangeText={setCveroKey}
             />
              <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={addContactHandler}
        >
          <Text style={styles.buttonTextStyle}>Add To Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button2Style}
          onPress={()=>setFormVisible(!FormVisible)}
        >
          <Text style={styles.buttonTextStyle}>Cancel</Text>
        </TouchableOpacity>
        </View>:<FlatList style={{width:'100%'}}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item)=>item.veroKey}
     />}
    
     <NewContactButton onCreateContact={()=>setFormVisible(!FormVisible)} />
  
  
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
    textAlign:'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor:Colors.light.tint,
    width:200,
    borderRadius:5
  },
  button2Style: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor:"red",
    width:200,
    borderRadius:5
  },
  buttonTextStyle: {
    color: Colors.light.background,
  
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    paddingHorizontal: 10,
    margin:10,
    padding:5
  },
});
