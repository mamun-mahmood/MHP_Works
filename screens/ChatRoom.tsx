import React from 'react'
import { Text ,FlatList,ImageBackground,KeyboardAvoidingView} from 'react-native'

import { useRoute } from '@react-navigation/core'
import chatRoomData from '../data/Chats'
import ChatMessage from '../components/chatMessage'
import { View } from 'react-native'
import InputBox from '../components/inputBox'

const ChatRoomScreen =()=>{
    const route = useRoute();
    console.log(route.params)
    return (
        <KeyboardAvoidingView
        behavior={"position"}>
       
<View>
  <FlatList data={chatRoomData.messages}
renderItem={({ item }) => <ChatMessage message={item} />} inverted />
      
      <InputBox />
</View>
</KeyboardAvoidingView>
)
}

export default ChatRoomScreen