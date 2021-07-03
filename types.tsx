/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
 Chats: undefined;
 Status: undefined;
 Calls: undefined;
};

export type ChatScreeneParamList = {
  ChatScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User={
  id:string,
  name:String,
  imageUri:String
}

export type Message={
  id:string,
  content:String,
  createdAt:String,
  user:User
}

export type ChatRoom={
  id:string;
  users:User[];
  lastMessage:Message
}