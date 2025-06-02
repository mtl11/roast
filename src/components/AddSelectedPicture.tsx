import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign for the retake icon
import colors from "../theme/colors"; // Import colors from constants.js

interface AddSelectedPictureProps {
  uri: string;
  onRetake: () => void;
  onContinue: () => void;
}

const AddSelectedPicture: React.FC<AddSelectedPictureProps> = ({
  uri,
  onRetake,
  onContinue,
}) => {
  return (
    <View style={styles.container}>
      {/* Display the image */}
      <Image source={{ uri }} style={styles.image} />

      {/* Retake Icon Button */}
      <TouchableOpacity style={styles.retakeButton} onPress={onRetake}>
      <AntDesign name="close" size={24} color={colors.activeText} />
      </TouchableOpacity>

      {/* Continue Button */}
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Use background color from constants.js
  },
  image: {
    flex: 1,
    resizeMode: "cover", // Ensure the image covers the whole screen
  },
  retakeButton: {
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 50,
    left: 0,
    paddingHorizontal: 15,
  },
  overlay: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.primary, // Use primary color from constants.js
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.activeText, // Use active text color from constants.js
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddSelectedPicture;
