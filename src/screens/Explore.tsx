import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors"; // Import the colors
import ExploreList from "../components/ExploreList";
import ExploreMap from "../components/ExploreMap";

// Blank Map Component
function MapComponent() {
  return (
    <View style={styles.contentContainer}>
      <Text>Map Component</Text>
    </View>
  );
}

export default function Explore() {
  const [isListView, setIsListView] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isListView && styles.activeButton]}
          onPress={() => setIsListView(true)}
        >
          <Text style={[styles.toggleText, isListView && styles.activeText]}>
            List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isListView && styles.activeButton]}
          onPress={() => setIsListView(false)}
        >
          <Text style={[styles.toggleText, !isListView && styles.activeText]}>
            Map
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {isListView ? <ExploreList /> : <ExploreMap />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "90%",
    backgroundColor: colors.toggleBackground,
    borderRadius: 8,
    padding: 5,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: 16,
    color: colors.text,
  },
  activeText: {
    color: colors.activeText,
    fontWeight: "bold",
  },
  contentContainer: {
  },
});
