import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { getFriendsIds, getUser } from "bitnbuild-back";
import colors from "../../colors";

interface SharedWorkout {
  id: string;
  by: string;
}

interface User {
  id?: string;
  email?: string;
  username: string;
  ownedWorkouts?: string[]; // ids
  sharedWorkouts?: SharedWorkout[];
  friends: string[]; // ids
}

export default function FriendsScrollList({ friends }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollView}
    >
      <>
        {friends
          ? (
            friends.map((user) => {
              return (
                <>
                  <View style={styles.userContainer}>
                    <FontAwesome6
                      name="person"
                      size={24}
                      color={colors.darkBlack}
                    />
                    <Text style={{ color: colors.darkBlack }}>
                      {user.username}
                    </Text>
                  </View>
                </>
              );
            })
          )
          : (
            <View style={styles.iconContainer}>
              <ActivityIndicator size={32} color={colors.blue} />
            </View>
          )}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 4,
    alignItems: "center",
  },
  iconContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 8,
    gap: 12,
    width: "100%",
    height: 32,
    backgroundColor: colors.lightGray,
  },
});
