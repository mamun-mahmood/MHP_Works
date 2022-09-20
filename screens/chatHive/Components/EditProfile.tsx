import { Entypo, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MonoText } from "../../../components/StyledText";
import { View } from "../../../components/Themed";

const EditProfile = ({ userData, setShowEditProfile }: any) => {
  const BaseURL = "https://soapboxapi.megahoot.net";
  const profilePicPath = `${BaseURL}/profile-pictures/${
    userData && userData.profilePic
  }`;
  const [openModal, setOpenModal] = useState(true);
  const [name, setName] = useState(userData.name);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        setShowEditProfile(false);
      }}
      hardwareAccelerated={true}
    >
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Ionicons
              onPress={() => setShowEditProfile(false)}
              name="arrow-back"
              size={24}
              color="white"
            />
            <Entypo name="cross" size={24} color="white" />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <View style={{ width: 100 }}>
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
                  <Entypo
                    style={{ top: "30%" }}
                    name="camera"
                    size={35}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <ScrollView> */}
          <View style={styles.infoContainer}>
            {/* <ScrollView> */}
            <MonoText style={styles.header}>Your Name</MonoText>
            <TextInput value={name} onChange={setName} style={styles.input} />
            <MonoText style={styles.smallText}>
              This could be your first name, full name, nickname or a business
              name, it's how you'll appear on Soapbox.
            </MonoText>

            <MonoText style={styles.header}>Username</MonoText>
            <TextInput value={userData?.username} style={styles.input} />
            <MonoText style={styles.smallText}>
              This is what identifies you as a Creator on Soapbox.
            </MonoText>

            <MonoText style={styles.header}>Website</MonoText>
            <TextInput value={userData?.website} style={styles.input} />
            <MonoText style={styles.smallText}>
              Link to a place on the internet where people can know more about
              you.
            </MonoText>

            <MonoText style={styles.header}>Bio</MonoText>
            <TextInput
              value={
                userData?.bio
                  ? userData?.bio
                  : "Write a short bio to show on your profile."
              }
              style={styles.input}
            />

            <MonoText style={styles.header}>Bio</MonoText>
            <TextInput
              value={
                userData?.bio
                  ? userData?.bio
                  : "Write a short bio to show on your profile."
              }
              style={styles.input}
            />

            <MonoText style={styles.header}>Email</MonoText>
            <TextInput
              value={userData?.email ? userData?.email : "Enter your email"}
              style={styles.input}
            />

            <MonoText>Link Your social media accounts</MonoText>
            <MonoText style={styles.smallText}>
              Add links to your social media accounts for people to get to know
              you better. This will be a part of your public profile on Soapbox.
            </MonoText>

            <MonoText style={styles.header}>Twitter</MonoText>
            <TextInput value={userData?.twitter} style={styles.input} />

            <MonoText style={styles.header}>Instagram</MonoText>
            <TextInput value={userData?.instagram} style={styles.input} />

            <MonoText style={styles.header}>LinkedIn</MonoText>
            <TextInput value={userData?.linkedIn} style={styles.input} />

            <MonoText style={styles.header}>Facebook</MonoText>
            <TextInput value={userData?.facebook} style={styles.input} />

            <MonoText style={styles.header}>TikTok</MonoText>
            <TextInput value={userData?.tiktok} style={styles.input} />

            <MonoText style={styles.header}>Snapchat</MonoText>
            <TextInput value={userData?.snapchat} style={styles.input} />

            <MonoText style={styles.header}>Reddit</MonoText>
            <TextInput value={userData?.reddit} style={styles.input} />

            <MonoText style={styles.header}>Pinterest</MonoText>
            <TextInput value={userData?.pinterest} style={styles.input} />

            <MonoText style={styles.header}>Medium</MonoText>
            <TextInput value={userData?.medium} style={styles.input} />

            <MonoText style={styles.header}>Medium</MonoText>
            <TextInput value={userData?.tumblr} style={styles.input} />

            <TouchableOpacity style={styles.btn}>
              <MonoText style={{ textAlign: "center" }}>Save Changes</MonoText>
            </TouchableOpacity>
            {/* </ScrollView> */}
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  profilePic: {
    height: 100,
    width: "100%",
    borderRadius: 50,
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
  infoContainer: {
    // height: "95%",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // paddingBottom: 50
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
  profilePicChangeBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "100%",
    position: "absolute",
    height: "100%",
  },
  smallText: {
    fontSize: 10,
    marginVertical: 5,
  },
  btn: {
    borderWidth: 0.5,
    borderColor: "grey",
    width: "50%",
    marginLeft: "25%",
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
    marginTop: 10
  },
});
export default EditProfile;
