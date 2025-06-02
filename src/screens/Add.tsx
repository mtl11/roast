import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import {
  Camera,
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { Modal, Portal, TextInput, Button } from "react-native-paper";
import colors from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const AddScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");

  const ref = useRef<CameraView>(null);
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [mode, setMode] = useState<CameraMode>("picture");
  const [uri, setUri] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  const takePhoto = async () => {
    // if (cameraRef.current) {
    //   const photoData = await cameraRef.current.takePictureAsync();
    //   // quality: 0.5, // Adjust quality as needed
    //   setPhoto(photoData.uri);
    //   setModalVisible(true); // Open the modal after taking a photo
    // }
  };

  const handleSave = () => {
    console.log(
      "Photo saved with location:",
      location,
      "and caption:",
      caption
    );
    setModalVisible(false);
    setPhoto(null);
    setLocation("");
    setCaption("");
  };

  const handleCancel = () => {
    setModalVisible(false);
    setPhoto(null);
    setLocation("");
    setCaption("");
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (!photo) {
      console.error("Failed to take picture");
      return;
    }
    setUri(photo.uri);
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View>
        {uri && (
          <Image
            source={{ uri }}
            resizeMode="cover"
            alt="Captured Image"
            style={{ width: 300, aspectRatio: 1 }}
          />
        )}
        <Button onPress={() => setUri(null)}>Take another picture</Button>
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <SafeAreaView style={styles.container}>
        <CameraView
          style={styles.camera}
          ref={ref}
          mode={mode}
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        >
          <View style={styles.shutterContainer}>
            <Pressable onPress={toggleMode}>
              {mode === "picture" ? (
                <AntDesign name="picture" size={32} color="white" />
              ) : (
                <Feather name="video" size={32} color="white" />
              )}
            </Pressable>
            <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
              {({ pressed }) => (
                <View
                  style={[
                    styles.shutterBtn,
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.shutterBtnInner,
                      {
                        backgroundColor: mode === "picture" ? "white" : "red",
                      },
                    ]}
                  />
                </View>
              )}
            </Pressable>
            <Pressable onPress={toggleFacing}>
              <FontAwesome6 name="rotate-left" size={32} color="white" />
            </Pressable>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cameraButtonContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    padding: 20,
  },
  cameraButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  cameraButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  preview: {
    flex: 1,
    resizeMode: "cover",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    height: "100%",
    width: "100%",
  },
  input: {
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
