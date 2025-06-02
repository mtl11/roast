import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useNavigation } from "@react-navigation/native";

import { Button } from "react-native-paper";
import colors from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddSelectedPicture from "../components/AddSelectedPicture";

export const AddScreen = () => {
  const navigation = useNavigation();

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<"on" | "off" | "auto">("off"); // Flash state

  const ref = useRef<CameraView>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [uri, setUri] = useState<string | null>(null);

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

  const toggleFlash = () => {
    setFlashMode((prev) => {
      if (prev === "off") return "on";
      if (prev === "on") return "auto";
      return "off";
    });
  };

  const renderCamera = () => {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          ref={ref}
          mode={"picture"}
          facing={facing}
          flash={flashMode}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="close" size={24} color={colors.activeText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Text style={styles.headerText}>Check In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFlash} style={styles.headerButton}>
              <Ionicons
                name={flashMode === "on" ? "flash" : "flash-off"}
                size={24}
                color={colors.activeText}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.shutterContainer}>
            <Pressable onPress={takePicture}>
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
          </View>
        </CameraView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? (
        <AddSelectedPicture
          uri={uri}
          onRetake={() => setUri(null)}
          onContinue={() => {
            console.log("Continue");
          }}
        />
      ) : (
        renderCamera()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    height: "100%",
  },
  headerButton: {
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 50,
    left: 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.activeText,
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
    justifyContent: "center",
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
