// import React, { Component } from 'react';
// import {
//   ActivityIndicator,
//   Button,
// //   Clipboard,
//   Image,
//   Share,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// // import { Constants } from 'expo';
// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
// import Clipboard from '@react-native-community/clipboard';

// export default class Kali extends Component {
//   state = {
//     image: null,
//     uploading: false,
//   };

//   render() {
//     let {
//       image
//     } = this.state;

//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle="default" />

//         <Text
//           style={styles.exampleText}>
//           Example: Upload ImagePicker result
//         </Text>

//         <Button
//           onPress={this._pickImage}
//           title="Pick an image from camera roll"
//         />

//         <Button onPress={this._takePhoto} title="Take a photo" />

//         {this._maybeRenderImage()}
//         {this._maybeRenderUploadingOverlay()}
//       </View>
//     );
//   }

//   _maybeRenderUploadingOverlay = () => {
//     if (this.state.uploading) {
//       return (
//         <View
//           style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
//           <ActivityIndicator color="#fff" size="large" />
//         </View>
//       );
//     }
//   };

//   _maybeRenderImage = () => {
//     let {
//       image
//     } = this.state;

//     if (!image) {
//       return;
//     }

//     return (
//       <View
//         style={styles.maybeRenderContainer}>
//         <View
//           style={styles.maybeRenderImageContainer}>
//           <Image source={{ uri: image }} style={styles.maybeRenderImage} />
//         </View>

//         <Text
//           onPress={this._copyToClipboard}
//           onLongPress={this._share}
//           style={styles.maybeRenderImageText}>
//           {image}
//         </Text>
//       </View>
//     );
//   };

//   _share = () => {
//     Share.share({
//       message: this.state.image,
//       title: 'Check out this photo',
//       url: this.state.image,
//     });
//   };

//   _copyToClipboard = () => {
//     Clipboard.setString(this.state.image);
//     alert('Copied image URL to clipboard');
//   };

//   _takePhoto = async () => {
//     const {
//       status: cameraPerm
//     } = await Permissions.askAsync(Permissions.CAMERA);

//     const {
//       status: cameraRollPerm
//     } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

//     // only if user allows permission to camera AND camera roll
//     if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
//       let pickerResult = await ImagePicker.launchCameraAsync({
//         allowsEditing: true,
//         aspect: [4, 3],
//       });

//       this._handleImagePicked(pickerResult);
//     }
//   };

//   _pickImage = async () => {
//     const {
//       status: cameraRollPerm
//     } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

//     // only if user allows permission to camera roll
//     if (cameraRollPerm === 'granted') {
//       let pickerResult = await ImagePicker.launchImageLibraryAsync({
//         allowsEditing: true,
//         aspect: [4, 3],
//       });

//       this._handleImagePicked(pickerResult);
//     }
//   };

//   _handleImagePicked = async pickerResult => {
//     let uploadResponse, uploadResult;

//     try {
//       this.setState({
//         uploading: true
//       });

//       if (!pickerResult.cancelled) {
//         uploadResponse = await uploadImageAsync(pickerResult.uri);
//         uploadResult = await uploadResponse.json();

//         this.setState({
//           image: uploadResult.location
//         });
//       }
//     } catch (e) {
//       console.log({ uploadResponse });
//       console.log({ uploadResult });
//       console.log({ e });
//       alert('Upload failed, sorry :(');
//     } finally {
//       this.setState({
//         uploading: false
//       });
//     }
//   };
// }

// async function uploadImageAsync(uri) {
// //   let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
//   let apiUrl = 'http://192.168.1.33:3000/uploadImage';

//   // Note:
//   // Uncomment this if you want to experiment with local server
//   //
//   // if (Constants.isDevice) {
//   //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//   // } else {
//   //   apiUrl = `http://localhost:3000/upload`
//   // }

//   let uriParts = uri.split('.');
//   let fileType = uriParts[uriParts.length - 1];

//   let formData = new FormData();

//   formData.append('photo', {
//     uri,
//     name: `photo.${fileType}`,
//     type: `image/${fileType}`,
//   });

//   let options = {
//     method: 'POST',
//     body: formData,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//     },
//   };

//   return fetch(apiUrl, options);
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   exampleText: {
//     fontSize: 20,
//     marginBottom: 20,
//     marginHorizontal: 15,
//     textAlign: 'center',
//   },
//   maybeRenderUploading: {
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//   },
//   maybeRenderContainer: {
//     borderRadius: 3,
//     elevation: 2,
//     marginTop: 30,
//     shadowColor: 'rgba(0,0,0,1)',
//     shadowOpacity: 0.2,
//     shadowOffset: {
//       height: 4,
//       width: 4,
//     },
//     shadowRadius: 5,
//     width: 250,
//   },
//   maybeRenderImageContainer: {
//     borderTopLeftRadius: 3,
//     borderTopRightRadius: 3,
//     overflow: 'hidden',
//   },
//   maybeRenderImage: {
//     height: 250,
//     width: 250,
//   },
//   maybeRenderImageText: {
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   }
// });

// import React, { useState } from "react";
// import { Button, ImageBackground, View } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system";

// const DocPicker = () => {
//   const [image, setImage] = useState();
//   const [doc, setDoc] = useState();
//   const pickDocument = async () => {
//     let result = await DocumentPicker.getDocumentAsync({
//       type: "*/*",
//       copyToCacheDirectory: true,
//     }).then((response) => {
//       if (response.type == "success") {
//         let { name, size, uri } = response;
//         let nameParts = name.split(".");
//         let fileType = nameParts[nameParts.length - 1];
//         var fileToUpload = {
//           name: name,
//           size: size,
//           uri: "file://" + uri,
//           type: "application/" + fileType,
//         };
//         console.log(fileToUpload, "...............file");
//         setDoc(fileToUpload);
//       }
//     });
//     // console.log(result);
//     console.log("Doc: " + doc.uri);
//   };

//   const postDocument = () => {
//     const url = "http://192.168.1.33:3000/uploadImage";
//     const fileUri = doc.u ri;
//     const formData = new FormData();
//     formData.append("document", doc);
//     const options = {
//       method: "POST",
//       body: formData,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     console.log(formData);
//     setImage(doc.uri);
//     fetch(url, options).catch((error) => console.log(error));
//   };

//   return (
//     <View>
//       <View
//         style={{
//           height: 100,
//           width: 100,
//           borderRadius: 15,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ImageBackground
//           source={{
//             uri: image,
//           }}
//           style={{ height: 150, width: 150, marginTop: 30 }}
//           imageStyle={{ borderRadius: 100 }}
//         ></ImageBackground>
//       </View>
//       <Button title="Select Document" onPress={pickDocument} />
//       <Button title="Upload" onPress={postDocument} />
//     </View>
//   );
// };

// export default DocPicker;

import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
//   Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Kali extends React.Component {
  state = {
    mssg: ""
  };

  handleClick = () => {
    this.setState({ mssg: "Hi there!" });
  };

  render() {
    console.log("render() method");
    return (
      <>
        <button onClick={this.handleClick}>Say something</button>
        <Text>{this.state.mssg}</Text>
      </>
    );
  }
}
