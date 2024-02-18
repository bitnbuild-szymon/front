import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import colors from "../../colors";

// TODO you challange someone
// TODO someone challenge you (who and which workout)
// TODO you can add someone to friends

interface Challenge {
  inviterId: string;
  workoutId: string;
}

export default function Friends() {
  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const [challenges, setChallenges] = useState<Challenge>();

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
            <View />
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
