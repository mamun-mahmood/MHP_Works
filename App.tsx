import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import socket, { startSocket } from './socket';
const db = SQLite.openDatabase('db.testDb') // returns Database object
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


// const createDb=()=>{
//   db.transaction(tx => {
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS chatData (id INTEGER PRIMARY KEY AUTOINCREMENT, veroKey TEXT,chats TEXT)'
//     )
//   })
// }



useEffect(() => {
// createDb()
startSocket()

},[])
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
