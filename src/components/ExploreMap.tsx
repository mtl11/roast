import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Feather from "@expo/vector-icons/Feather";
import * as Location from "expo-location";

const MapsView = () => {
  const [currentStation, setCurrentStation] = useState<string | null>(null);
  const [showOverlayButton, setShowOverlayButton] = useState(false);
  const [initialRegion, setInitialRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const DUMMY_DATA = [
    {
      id: "1",
      shopName: "Starbucks",
      distance: "10mi",
      latitude: 37.38799,
      longitude: -122.083,
    },
    {
      id: "2",
      shopName: "Blue Bottle Coffee",
      distance: "5mi",
      latitude: 37.39499,
      longitude: -122.078,
    },
  ];

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      try {
        setLoading(true);
        let location = await Location.getLastKnownPositionAsync({});
        if (location && location.coords) {
          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        } else {
          console.log("Location data is unavailable");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    console.log("Requesting location permissions...");
    getLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsCompass={true}
        showsScale={true}
        showsUserLocation={true}
        followsUserLocation={false}
        showsBuildings={true}
        showsPointsOfInterest={false} // Disable default POIs
      >
        {DUMMY_DATA.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.shopName}
            description={`Distance: ${station.distance}`}
            onPress={() => {
              setCurrentStation(station.shopName);
              setShowOverlayButton(true);
            }}
          />
        ))}
      </MapView>

      {showOverlayButton && (
        <TouchableOpacity style={styles.mapOverlayButton}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>{currentStation || ""}</Text>
            <TouchableOpacity
              onPress={() => {
                setShowOverlayButton(false);
              }}
            >
              <Feather name="x" size={24} color={"black"} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  map: {
    // flex: 1,
    margin: 10, // Add margin for better spacing
    borderRadius: 10, // Rounded corners for better UX
    overflow: "hidden",
    alignSelf: "center",
    height: "100%", // Ensure the map takes full height
    width: "100%", // Ensure the map takes full width
  },
  mapOverlayButton: {
    backgroundColor: "white",
    alignSelf: "center",
    padding: 15,
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    borderRadius: 12,
    width: "90%", // Wider overlay for better visibility
    elevation: 5, // Add shadow for better UX
  },
  overlayContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default MapsView;