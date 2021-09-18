// import React from "react";
// import { Text, View } from "react-native";

// const ProfileEdit = () => {
//     return(
//     <View>
//         <Text>
//             HI kunal
//         </Text>
//     </View>
//     )
// }

// export default ProfileEdit;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Platform,
  Button,
  Image,
} from "react-native";

import { useTheme } from "react-native-paper";

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
// import ImagePickerRN from "react-native-image-crop-picker";

import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import axios from "axios";

// const ProfileEdit = (props) => {

function ProfileEdit({ route }) {
  const { userFirstName } = route.params;
  const { userLastName } = route.params;
  const { userPicture } = route.params;

  console.log(userPicture);

  const [image, setImage] = useState(userPicture);
  // const [image, setImage] = useState(null);

  const cameraPickerHandler = async () => {
    console.log("pressed");
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      // base64: true,
    });

    if (!result.cancelled) {
      console.log("working");
      setImage(result.uri);
      console.log(result);

      //kunal changes /
      // let apiUrl = 'http://192.168.1.33:3000/UploadPhoto';
      let apiUrl = "http://192.168.1.33:3000/uploadImage";
      let uri = result.uri;
      let uriParts = uri.split(".");
      let fileType = uriParts[uriParts.length - 1];

      let formData = new FormData();
      formData.append("filename", photo);
      formData.append("photo", {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      let options = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      return fetch(apiUrl, options);
      //kunal changes \
    }
  };

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //     base64: true,
  //   });
  //   if (!result.cancelled) {
  //     if (result.type == "image") {
  //       console.log("working");
  //       setImage(result.uri);
  //       console.log(result.uri);
  //     }
  //   }
  // };
  const [doc, setDoc] = useState();
  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    }).then((response) => {
      if (response.type == "success") {
        let { name, size, uri } = response;
      
        let nameParts = name.split(".");
        let fileType = nameParts[nameParts.length - 1];
        var fileToUpload = {
          name: name,
          size: size,
          uri: "file://" + uri,
          type: "application/" + fileType,
          // type: "application/" ,
        };
        console.log(fileToUpload, "...............file");
        setDoc(fileToUpload);
        
      }
    });
    // console.log(result);
    setImage(doc.uri);
    console.log("Doc: " + doc.uri);
  };

  const postDocument = () => {
    const url = "http://192.168.1.33:3000/uploadImage";
    const fileUri = doc.uri;
    const formData = new FormData();
    formData.append("document", doc);
    const options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    console.log(formData);
    setImage(doc.uri);
    let errCount=0;
    fetch(url, options).catch((error) => {console.log(error); 
    if(error){alert("Profile picture not updated")}
    errCount=1;
  }).then(()=>alert("Profile picture updated"))

  // alert("Profile uploaded")
    // if(errCount===1){alert("Not uploaded")}
    // else {alert("Profile uploaded")}
    
  };

  // const [image, setImage] = useState('https://w7.pngwing.com/pngs/304/305/png-transparent-man-with-formal-suit-illustration-web-development-computer-icons-avatar-business-user-profile-child-face-web-design-thumbnail.png');

  const { colors } = useTheme();

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //   //   bs.current.snapTo(1);
  //   });
  // }

  // const choosePhotoFromLibrary = () => {
  // ImagePicker.openPicker({
  //   width: 300,
  //   height: 300,
  //   cropping: true,
  //   compressImageQuality: 0.7,
  // }).then((image) => {
  //   console.log(image);
  //   setImage(image.path);
  //   bs.current.snapTo(1);
  // });
  //   console.log("hi");

  // };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      {/* <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}> */}
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={cameraPickerHandler}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        // onPress={() => bs.current.snapTo(1)}>
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");

  const editProfile = () => {
    axios
      .patch(`http://192.168.1.33:3000/api/users/updateuser`, {
        first_name: fName,
        last_name: lName,
        id: parseInt(global.privateKey),
      })
      .then((res) => {
        console.log(res);
        alert("Name updated");
      })
      .catch((err) => console.log(err));

    // console.log(global.privateKey);
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          {/* <TouchableOpacity onPress={() => bs.current.snapTo(0)}> */}
          {/* <TouchableOpacity onPress={pickImage}> */}
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{ height: 150, width: 150, marginTop: 30 }}
                imageStyle={{ borderRadius: 100 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="camera"
                    size={25}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 50,
                    }}
                  />
                </View>
              </ImageBackground>
              {/* <View>
              <Button title="chooseimage" onPress={PickImage}>{image && <Image source={{uri:image}} style={{width:200, height:200}}/>}</Button>
              </View> */}
            </View>
          </TouchableOpacity>
          {/* <View
                  style={{
                    flex: 1,
                  }}
                >
          <TouchableOpacity
          style={styles.commandButton}
          // onPress={() => {}}
          onPress={postDocument}
        >
          <Text style={styles.panelButtonTitle}>upload</Text>
        </TouchableOpacity>
        </View> */}

          <Text style={{ marginTop: 80, fontSize: 18, fontWeight: "bold" }}>
            {userFirstName} {userLastName}
          </Text>

          {/* <TouchableOpacity
            style={styles.panelButton}
            onPress={cameraPickerHandler}
          >
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            value={fName}
            onChangeText={setfName}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            value={lName}
            onChangeText={setlName}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        {/* <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View> */}
        {/* <View style={styles.action}>
          <MaterialIcons name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View> */}
        <TouchableOpacity
          style={styles.commandButton}
          // onPress={() => {}}
          onPress={editProfile}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commandButton}
          // onPress={() => {}}
          onPress={postDocument}
        >
          <Text style={styles.panelButtonTitle}>Confirm Picture</Text>
        </TouchableOpacity>
       
      
        

      </Animated.View>
    </View>
  );
}

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    // backgroundColor: '#FF6347',
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    marginTop: 30,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
