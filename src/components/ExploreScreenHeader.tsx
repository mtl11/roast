import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, Portal, TextInput } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import * as Location from "expo-location";
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
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredCities(
      cities.filter((city) => city.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleCitySelect = (city: string) => {
    setSelectedLocation(city);
    setModalVisible(false);
  };

  const handleUseCurrentLocation = async () => {
    setLoadingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      setLoadingLocation(false);
      return;
    }

    try {
      let location = await Location.getLastKnownPositionAsync({});
      if (location && location.coords) {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          const { city, region, street } = reverseGeocode[0];
          const locationName = city || region || street || "Unknown Location";
          setSelectedLocation(locationName); // Set the city/neighborhood as the selected location
        }
      } else {
        console.log("Location data is unavailable");
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingLocation(false);
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
          <Text style={styles.clickableText}>{selectedLocation}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.modalTitle}>Search City</Text>
          <TextInput
            mode="outlined"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Enter city name"
            // style={styles.searchInput}
          />
          <FlatList
            data={filteredCities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => handleCitySelect(item)}
              >
                <Text style={styles.listItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.useLocationButton}
            onPress={handleUseCurrentLocation}
          >
            {loadingLocation ? (
              <ActivityIndicator size="small" color={colors.activeText} />
            ) : (
              <View style={styles.locationButtonContent}>
                <Feather name="map-pin" size={20} color={colors.primary} />
                <Text style={styles.useLocationButtonText}>
                  Use Current Location
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.submitButtonText}>Close</Text>
          </TouchableOpacity>
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
    borderRadius: 12, // Rounded corners for iOS look
    shadowColor: "#000", // Add shadow for iOS feel
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: colors.inputBackground,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 15,
    color: colors.text,
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemText: {
    fontSize: 16,
    color: colors.text,
  },
  useLocationButton: {
    backgroundColor: "white", // White background
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2, // Add border width
    borderColor: colors.primary, // Border color set to active color
  },
  locationButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  useLocationButtonText: {
    color: colors.primary, // Text color matches the border color
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.activeText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
