import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, Portal, TextInput, Button, List } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../theme/colors";

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

export const ExploreScreenHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredCities(
      cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleCitySelect = (city: string) => {
    console.log(`Selected city: ${city}`);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.citySelector}
        >
          <MaterialIcons
            name="my-location"
            size={20}
            color={colors.activeText}
          />
          <Text style={styles.clickableText}>Select Location</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <TextInput
            label="Search City"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <List.Item title={item} onPress={() => handleCitySelect(item)} />
            )}
          />
          <Button
            mode="contained"
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: colors.primary,
        
    },
    header: {
      width: "100%",
      backgroundColor: colors.primary,
      flexDirection: "row",
      justifyContent: "center", // Center content horizontally
      alignItems: "center", // Center content vertically
    //   paddingHorizontal: 15,
      marginTop: 10,
    },
    citySelector: {
      flexDirection: "row",
      alignItems: "center", // Align text and icon vertically
    },
    clickableText: {
      fontSize: 16,
      color: colors.activeText,
      fontWeight: "bold",
      marginLeft: 5, // Add spacing between the icon and text
    },
    modalContainer: {
      backgroundColor: "white",
      padding: 20,
      marginHorizontal: 20,
      borderRadius: 8,
    },
    searchInput: {
      marginBottom: 10,
    },
    closeButton: {
      marginTop: 10,
    },
  });