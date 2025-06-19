import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import colors from "../theme/colors";
import { COFFEE_SHOPS } from "../data/coffee-shops-data"; // Import the coffee shop data

function RowComponent({ id }: { id: string }) {
  // Find the coffee shop by id
  const shop = COFFEE_SHOPS.find((shop) => shop.id === id);

  if (!shop) {
    return null; // If no shop is found, return null
  }

  const handlePress = () => {
    console.log(`Row clicked: ${shop.name}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.row}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.shopName}>{shop.name}</Text>
          <Text style={styles.shopAddress}>{shop.address.fullAddress}</Text>
          <View style={styles.rowDetails}>
            <Text style={styles.shopRating}>Rating: {shop.rating} ⭐</Text>
          </View>
          {shop.specialty && (
            <Text style={styles.shopSpecialty}>
              Specialty: {shop.specialty.join(", ")}
            </Text>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default function ExploreList() {
  return (
    <FlatList
      data={COFFEE_SHOPS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RowComponent id={item.id} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    height: "100%",
  },
  row: {
    width: "90%",
    marginVertical: 5,
    borderRadius: 8,
    alignSelf: "center",
  },
  card: {
    backgroundColor: colors.toggleBackground,
    borderRadius: 8,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  shopAddress: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  rowDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  shopRating: {
    fontSize: 14,
    color: "#000",
  },
  shopSpecialty: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
    fontStyle: "italic",
  },
});
