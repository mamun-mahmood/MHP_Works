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
  View,
} from "react-native";
import { MonoText } from "../../../components/StyledText";
import Colors from "../../../constants/Colors";

const ProfilePictureModal = ({ userData }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const BaseURL = "https://soapboxapi.megahoot.net";
  const profilePicPath = `${BaseURL}/profile-pictures/${
    userData && userData.profilePic
  }`;
  console.log(userData);

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpenModal(true)}
        style={styles.container}
      >
        <View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(false);
        }}
        hardwareAccelerated={true}
      >
        <Pressable
          onPress={() => setOpenModal(false)}
          style={styles.modalContainerStyle}
        >
          <Pressable style={styles.modalContent}>
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
              <TextInput defaultValue={userData?.name} style={styles.input} />
              <MonoText style={styles.header}>Username</MonoText>
              <TextInput
                defaultValue={userData?.username}
                style={styles.input}
              />
              <MonoText style={styles.header}>Bio</MonoText>
              <TextInput
                defaultValue={
                  userData?.bio ? userData?.bio : "Tell about yourself"
                }
                style={styles.input}
              />
              <MonoText style={styles.header}>Email</MonoText>
              <TextInput
                defaultValue={
                  userData?.email ? userData?.email : "Enter your email"
                }
                style={styles.input}
              />
              <MonoText style={styles.header}>Community Club</MonoText>
              <MonoText style={styles.text}>{userData?.communityClub}</MonoText>
              <MonoText style={styles.header}>Email</MonoText>
              <TextInput
                defaultValue={
                  userData?.email ? userData?.email : "Enter your email"
                }
                placeholderTextColor="white"
                style={styles.input}
              />
              {/* </ScrollView> */}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    backgroundColor: "#1b1b23",
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
});
export default ProfilePictureModal;
