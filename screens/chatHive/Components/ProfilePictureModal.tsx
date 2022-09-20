import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MonoText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import EditProfile from "./EditProfile";

const ProfilePictureModal = ({ userData }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const BaseURL = "https://soapboxapi.megahoot.net";
  const profilePicPath = `${BaseURL}/profile-pictures/${
    userData && userData.profilePic
  }`;
  const closeModal = () => {
    if (!showEditProfile) {
      setOpenModal(false);
    }
  };
  console.log(userData);
  const [showEditProfile, setShowEditProfile] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setOpenModal(true);
          setShowEditProfile(false);
        }}
        style={styles.container}
      >
        <View style={{backgroundColor: "transparent"}} > 
          {profilePicPath ? (
            <Image source={{ uri: profilePicPath }} style={styles.avatar} />
          ) : (
            <View style={{ marginLeft: 20 }}>
              <FontAwesome name="user" size={24} color="white" />
            </View>
          )}
          {/* <MaterialIcons name="contact-page" size={20} color="white" /> */}
        </View>
      </TouchableOpacity>
      {/* {!showEditProfile ? ( */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => closeModal()}
        hardwareAccelerated={true}
      >
        <Pressable
          onPress={() => closeModal()}
          style={styles.modalContainerStyle}
        >
          <Pressable style={styles.modalContent}>
            {showEditProfile ? (
              <EditProfile
                userData={userData}
                setShowEditProfile={setShowEditProfile}
              />
            ) : (
              <>
                <View>
                  <Image
                    source={{ uri: profilePicPath }}
                    style={styles.profilePic}
                  />
                  <View style={styles.profilePicChangeBtn}>
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Entypo name="camera" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  {/* <ScrollView> */}
                  <MonoText style={styles.header}>Your Name</MonoText>
                  <TextInput value={userData?.name} style={styles.input} />
                  <MonoText style={styles.header}>Username</MonoText>
                  {/* <TextInput value={userData?.username} style={styles.input} /> */}
                  <MonoText style={styles.header}>Bio</MonoText>
                  <TextInput
                    value={
                      userData?.bio ? userData?.bio : "Tell about yourself"
                    }
                    style={styles.input}
                  />
                  <MonoText style={styles.header}>Email</MonoText>
                  <TextInput
                    value={
                      userData?.email ? userData?.email : "Enter your email"
                    }
                    style={styles.input}
                  />
                  {/* <MonoText style={styles.text}>{userData?.communityClub}</MonoText> */}
                  <TouchableOpacity onPress={() => setShowEditProfile(true)}>
                    <MonoText style={styles.btn}>Edit Profile </MonoText>
                  </TouchableOpacity>
                  {/* </ScrollView> */}
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
      {/* ) : ( */}

      {/* )} */}
    </>
  );
};
const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    marginLeft: "10%",
    marginTop: 30,
    backgroundColor: "transparent",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 20,
    backgroundColor: Colors.light.background,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    // backgroundColor: "#1b1b23",
    height: "85%",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: "scroll",
  },
  header: {
    fontSize: 12,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 3,
    marginVertical: 5,
  },
  profilePicChangeBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  input: {
    borderColor: "grey",
    borderWidth: 0.2,
    padding: 5,
    fontSize: 16,
    borderRadius: 5,
    paddingLeft: 10,
    color: "white",
  },
  btn: {
    backgroundColor: "#000",
    textAlign: "center",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    borderColor: "grey",
    borderWidth: 0.5,
  },
});
export default ProfilePictureModal;
