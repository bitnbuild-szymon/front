import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFriendsIds, getUser } from "bitnbuild-back";
import colors from "../../colors";

// TODO you challange someone
// TODO someone challenge you (who and which workout)
// TODO you can add someone to friends

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

export default function Friends() {
  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const [challenges, setChallenges] = useState<SharedWorkout[]>();
  const [friends, setFriends] = useState<User[]>();

  useEffect(() => {
    (async () => {
      const ids = await getFriendsIds("IFBVDZHMGmaeI6OksMiPO7ropyD2"); // your id
      const friends: User[] = [];
      for (const friendId of ids) friends.push(await getUser(friendId));
      setFriends(friends);
    })();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.darkBlack} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>friends</Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            onLayout={({ nativeEvent }) =>
              setScrollViewHeight(nativeEvent.layout.height)
            }
            contentContainerStyle={styles.scrollView}
          >
            {scrollViewHeight == 0 ? (
              <></>
            ) : (
              friends?.map((user) => {
                return (
                  <View
                    style={[
                      {
                        backgroundColor: colors.lightGray,
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 6,
                      },
                      {
                        width: screenWidth - 20,
                        height: scrollViewHeight / 6 - 10 - 10 / 6,
                      },
                    ]}
                  >
                    <Text>{user.username}</Text>
                  </View>
                );
              })
            )}
          </ScrollView>
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
