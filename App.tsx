import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import Explore from "./src/screens/Explore";
import { ExploreScreenHeader } from "./src/components/ExploreScreenHeader";
import { PaperProvider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons for icons
import colors from "./src/theme/colors";

// Placeholder screens
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

function AddScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: "search" | "search-outline" | "add-circle" | "add-circle-outline" | "home" | "home-outline" = "search";

              if (route.name === "Explore") {
                iconName = focused ? "search" : "search-outline";
              } else if (route.name === "Add") {
                iconName = focused ? "add-circle" : "add-circle-outline";
              } else if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              }

              // Return the Ionicons component
              return <Ionicons name={iconName} size={28} color={color} />;
            },
            tabBarShowLabel: false, // Disable text labels
            tabBarActiveTintColor:colors.primary, // Active tab color
            tabBarInactiveTintColor: colors.inactiveIcon,
            tabBarStyle: {
              height: 70, // Adjust the height of the tab bar
              paddingBottom: 5, // Add padding for better alignment
            }, // Inactive tab color
          })}
        >
          <Tab.Screen
            name="Explore"
            component={Explore}
            options={{ header: () => <ExploreScreenHeader /> }}
          />
          <Tab.Screen
            name="Add"
            component={AddScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
