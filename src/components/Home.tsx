import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Lato-Bold", fontSize: 32 }}>
        Open up App.tsx to start working on your app!
      </Text>
    </View>
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
