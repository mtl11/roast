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
  const [initialRegion, setInitialRegion] = useState<
    | {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const DUMMY_DATA = [
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      shopName: "Starbucks",
      distance: "10mi",
      vibez: ["Awesome", "Good Lattes"],
      signature: "Iced Vanilla Latte",
      latitude: 37.38799,
      longitude: -122.083,
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
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
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

    getLocation();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <MapView initialRegion={initialRegion} style={styles.map} ></MapView>

      {/* <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsCompass={true}
        showsScale={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsBuildings={false}
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
      </MapView> */}

      {showOverlayButton && (
        <TouchableOpacity style={styles.mapOverlayButton}>
          <View style={styles.overlayContent}>
            <Text>{currentStation || ""}</Text>
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
  },
  map: {
    height: "100%",
    width: "100%",
  },
  mapOverlayButton: {
    backgroundColor: "white",
    alignSelf: "center",
    padding: "2%",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    borderRadius: 12,
    width: "80%",
    height: "10%",
  },
  overlayContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
  },
});

export default MapsView;
