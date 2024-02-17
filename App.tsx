import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/components/Home";
import Training from "./src/components/Training";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import colors from "./colors";
import { Entypo } from "@expo/vector-icons";

import { init } from "bitnbuild-back";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    init();
  }, []);

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
                        <Svg viewBox="0 0 40 40">
                          <Path
                            fill={focused ? colors.blue : colors.darkBlack}
                            d="M 8,17.54 19.99996,6.38 32,17.54 V 29.3 c 0,2.88 -1.92,4.32 -4.32,4.32 H 23.36 V 24.98004 H 16.64 V 33.62 H 12.32 C 9.92,33.62 8,32.18 8,29.3 Z"
                          />
                        </Svg>
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
                        <Svg viewBox="0 0 40 40">
                          <Path
                            fill={focused ? colors.blue : colors.darkBlack}
                            d="m 12,12 c -1.108,0 -2,0.892 -2,2 v 2 C 10,15.446 9.554,15 9,15 8.446,15 8,15.446 8,16 v 1.2 c 0,-0.3878 -0.446,-0.7 -1,-0.7 -0.554,0 -1,0.3122 -1,0.7 v 5.6 c 0,0.3878 0.446,0.7 1,0.7 0.554,0 1,-0.3122 1,-0.7 V 24 c 0,0.554 0.446,1 1,1 0.554,0 1,-0.446 1,-1 v 2 c 0,1.108 0.892,2 2,2 1.108,0 2,-0.892 2,-2 v -4 h 12 v 4 c 0,1.108 0.892,2 2,2 1.108,0 2,-0.892 2,-2 v -2 c 0,0.554 0.446,1 1,1 0.554,0 1,-0.446 1,-1 v -1.2 c 0,0.3878 0.446,0.7 1,0.7 0.554,0 1,-0.3122 1,-0.7 v -5.6 c 0,-0.3878 -0.446,-0.7 -1,-0.7 -0.554,0 -1,0.3122 -1,0.7 V 16 c 0,-0.554 -0.446,-1 -1,-1 -0.554,0 -1,0.446 -1,1 v -2 c 0,-1.108 -0.892,-2 -2,-2 -1.108,0 -2,0.892 -2,2 v 4 H 14 v -4 c 0,-1.108 -0.892,-2 -2,-2 z"
                          />
                        </Svg>
                      );
                    },
                  }}
                />
                <Tab.Screen
                  name="Diet"
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
                        <Svg viewBox="0 0 40 40">
                          <Path
                            fill={focused ? colors.blue : colors.darkBlack}
                            d="m 19.99844,11.669578 c -5.318193,0.05882 -11.4909883,0.654995 -16.9984403,3.116879 0,0 0.0048,0.399099 0.04664,1.050101 l 0.0048,0.09381 c 0,0 0,0 0.0048,0 0.290264,4.280112 2.343452,15.736303 16.9452803,15.736303 14.77518,0 16.707739,-11.756933 16.96051,-15.797881 C 37,15.260757 37,14.910656 37,14.910656 31.176466,12.389431 26.028825,11.603772 20.001561,11.670542 Z m 0,1.018753 c 5.185812,0.01957 10.477466,0.464391 15.605001,2.595702 C 25.208154,18.012795 14.894367,17.863642 4.6552847,15.228123 9.8691957,13.048052 14.880258,12.66924 19.99844,12.688328 Z"
                          />
                        </Svg>
                      );
                    },
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
                        color={focused ? colors.blue : colors.gray}
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
                        color={focused ? colors.blue : colors.gray}
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
