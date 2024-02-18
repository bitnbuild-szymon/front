import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { init } from "bitnbuild-back";
import Home from "./src/components/Home";
import Training from "./src/components/Training";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import NewWorkout from "./src/components/NewWorkout";
import colors from "./colors";
import Friends from "./src/components/Friends";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => init(), []);

  const [user, setUser] = useState(null);
  const Tab = createBottomTabNavigator();
  const [fontsLoaded, fontError] = useFonts({
    "Caveat-Bold": require("./assets/fonts/Caveat-SemiBold.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Bold-Italic": require("./assets/fonts/Lato-BoldItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      <View onLayout={onLayoutRootView} />
      <NavigationContainer>
        <Tab.Navigator>
          {user
            ? (
              <>
                <Tab.Screen
                  name="Home"
                  component={Home}
                  initialParams={{
                    profile: user.userProfile,
                    logout: () => setUser(null),
                  }}
                  options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.blue,
                    tabBarIcon({ focused }) {
                      return (
                        <Ionicons
                          name="home"
                          size={24}
                          color={focused ? colors.blue : colors.darkBlack}
                        />
                      );
                    },
                  }}
                />
                <Tab.Screen
                  name="Training"
                  component={Training}
                  initialParams={{
                    profile: user.userProfile,
                    logout: () => setUser(null),
                  }}
                  options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.blue,
                    tabBarIcon({ focused }) {
                      return (
                        <Ionicons
                          name="barbell"
                          size={24}
                          color={focused ? colors.blue : colors.darkBlack}
                        />
                      );
                    },
                  }}
                />
                <Tab.Screen
                  name="Add Friends"
                  component={Friends}
                  initialParams={{
                    profile: user.userProfile,
                    logout: () => setUser(null),
                  }}
                  options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.blue,
                    tabBarIcon({ focused }) {
                      return (
                        <FontAwesome5
                          name="user-friends"
                          size={24}
                          color={focused ? colors.blue : colors.darkBlack}
                        />
                      );
                    },
                  }}
                />
                <Tab.Screen
                  name="NewWorkout"
                  component={NewWorkout}
                  options={{
                    tabBarItemStyle: { display: "none" },
                    headerShown: false,
                  }}
                />
              </>
            )
            : (
              <>
                <Tab.Screen
                  name="Login"
                  component={Login}
                  initialParams={{
                    setUser,
                  }}
                  options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.blue,
                    tabBarIcon: ({ focused }) => (
                      <Entypo
                        name="login"
                        size={24}
                        color={focused ? colors.blue : colors.darkGray}
                      />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Register"
                  component={Register}
                  initialParams={{
                    setUser,
                  }}
                  options={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.blue,
                    tabBarIcon: ({ focused }) => (
                      <Entypo
                        name="login"
                        size={24}
                        color={focused ? colors.blue : colors.darkGray}
                      />
                    ),
                  }}
                />
              </>
            )}
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
