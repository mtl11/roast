import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Explore from "./src/screens/Explore";
import { ExploreScreenHeader } from "./src/components/ExploreScreenHeader";
import { PaperProvider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons for icons
import colors from "./src/theme/colors";
import { AddScreen } from "./src/screens/Add";
import { HomeScreen } from "./src/screens/Home";
import Settings from "./src/screens/Settings";

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function AddNullComponent() {
  return null;
}

function TabNavigator({ navigation }: { navigation: any }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | "search"
            | "search-outline"
            | "add-circle"
            | "add-circle-outline"
            | "home"
            | "home-outline" = "search";

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
        tabBarShowLabel: true, // Enable text labels
        tabBarActiveTintColor: colors.primary, // Active tab color
        tabBarInactiveTintColor: colors.inactiveIcon,
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size for labels
          fontWeight: "600", // Make labels slightly bold
        },
      })}
    >
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          header: () => <ExploreScreenHeader />,
          tabBarLabel: "Explore", // Label for the Explore tab
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNullComponent} // Empty component for the Add tab
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Add")} // Navigate to AddScreen in RootStack
              style={styles.addButton}
            >
              <Ionicons
                name="add-circle-outline"
                size={28}
                color={colors.inactiveIcon}
              />
              <Text style={styles.tabLabel}>Add</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home", // Label for the Home tab
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          {/* Main Tab Navigator */}
          <RootStack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          {/* Add Screen as a Modal */}
          <RootStack.Screen
            name="Add"
            component={AddScreen}
            options={{
              // Makes it appear as a modal
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
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
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.inactiveIcon, // Matches inactive icon color
    marginTop: 2, // Add spacing between the icon and label
  },
});
