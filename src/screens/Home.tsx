import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the profile icon
import colors from "../theme/colors"; // Import colors from constants.js

const mockData = [
  { id: "1", uri: "https://via.placeholder.com/150", caption: "Coffee Shop 1" },
  { id: "2", uri: "https://via.placeholder.com/150", caption: "Coffee Shop 2" },
  { id: "3", uri: "https://via.placeholder.com/150", caption: "Coffee Shop 3" },
];

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const renderItem = ({ item }: { item: { uri: string; caption: string } }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.caption}>{item.caption}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate("Settings")} // Navigate to settings screen
      >
        <Ionicons name="person-circle-outline" size={32} color={"white"} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.username}>@johndoe</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>25</Text>
            <Text style={styles.statLabel}>Check-ins</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>10</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
      </View>

      {/* Lazy Load List */}
      <FlatList
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileIcon: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.activeText,
  },
  username: {
    fontSize: 16,
    color: colors.activeText,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.activeText,
  },
  statLabel: {
    fontSize: 14,
    color: colors.activeText,
  },
  list: {
    padding: 10,
  },
  listItem: {
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  caption: {
    marginTop: 5,
    fontSize: 14,
    color: colors.text,
  },
});
