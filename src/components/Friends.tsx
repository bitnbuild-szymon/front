import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { addFriend, getUser, getUsersIds } from "bitnbuild-back";
import colors from "../../colors";
import FriendsScrollList from "./FriendsScrollList";

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

export default function Friends({ route }) {
  const [friends, setFriends] = useState<User[]>();
  const addF = async (u: User) => {
    await addFriend(route.params.profile.id, u.id);
    setFriends(friends.filter((f) => f.id !== u.id));
  };

  useEffect(() => {
    (async () => {
      const ids = await getUsersIds();
      const friends: User[] = [];
      for (const friendId of ids) {
        if (
          !route.params.profile.friends.includes(friendId) &&
          route.params.profile.id !== friendId
        ) {
          try {
            friends.push(await getUser(friendId));
          } catch (error) {}
        }
      }
      setFriends(friends);
    })();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.darkBlack} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>add friends</Text>
        </View>
        <View style={styles.contentContainer}>
          <FriendsScrollList friends={friends} setUser={addF} />
        </View>
      </View>
    </>
  );
}

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkBlack },
  titleContainer: {
    flex: 2,
    width: screenWidth,
    backgroundColor: colors.darkBlack,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontFamily: "Lato-Bold",
    fontSize: 32,
    textTransform: "uppercase",
  },
  contentContainer: {
    flex: 10,
    width: screenWidth,
    backgroundColor: colors.whitesmoke,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  scrollView: { paddingVertical: 10, gap: 10, alignItems: "center" },
});
