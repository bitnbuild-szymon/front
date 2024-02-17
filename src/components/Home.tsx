import React, { useRef, useState } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../colors";
import Time from "../static/time";
import quotes from "../static/quotes.json";

export default function Home({ route }) {
  const containerHeight = useRef<number>();
  const navigation = useNavigation();
  const date = new Time(new Date());

  const getRandomQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  };

  const quote = getRandomQuote();

  return (
    <>
      <StatusBar backgroundColor={colors.darkBlack} />
      <View
        style={styles.container}
        onLayout={({ nativeEvent }) => {
          containerHeight.current = nativeEvent.layout.height;
        }}
      >
        <View style={styles.userView}>
          <TouchableWithoutFeedback
            onPress={() => console.log("open settings")}
          >
            <View style={styles.userProfilePicture} />
          </TouchableWithoutFeedback>
          <Text style={styles.userText}>
            Hello, {route.params?.profile?.username || "User"}
          </Text>
        </View>
        <View style={styles.quoteView}>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>{` ${quote.author} `}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date.getDateName()}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.componentContainer}></View>
          <View style={styles.progressContainer}>
            <View style={styles.progressPhotosContainer}>
              <View style={styles.progressLeftPhoto} />
              <View style={styles.progressRightPhotosContainer}>
                <View style={styles.progressPhotoTopRight} />
                <View style={styles.progressPhotoBottomRight} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.darkBlack },

  // #region user view
  userView: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
  },
  userProfilePicture: {
    width: 64,
    height: 64,
    backgroundColor: "deepskyblue",
    borderRadius: 32,
  },
  userText: {
    color: colors.white,
    fontFamily: "Lato-Bold",
    fontSize: 28,
    fontWeight: "600",
    width: screenWidth - 64 - 24,
    textAlign: "center",
  },
  //#endregion

  // #region quote
  quoteView: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth,
    paddingHorizontal: 32,
  },
  quoteText: {
    width: "100%",
    color: colors.mediumGray,
    textAlign: "center",
    fontFamily: "Lato-Bold-Italic",
    fontSize: 12,
    marginTop: 16,
  },
  quoteAuthor: {
    width: "100%",
    color: colors.white,
    textAlign: "right",
    fontFamily: "Caveat-Bold",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 24,
  },
  //#endregion

  // #region date
  dateContainer: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 12,
    justifyContent: "flex-end",
  },
  dateText: {
    color: colors.white,
    fontFamily: "Lato-Bold",
    fontSize: 18,
    textAlign: "center",
    paddingBottom: 20,
  },
  // #endregion

  // content
  contentContainer: {
    flex: 9,
    backgroundColor: colors.whitesmoke,
    width: screenWidth,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10,
  },

  componentContainer: {
    flex: 2,
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
  },

  //#region progress
  progressContainer: {
    flex: 3,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    marginBottom: 12,
    borderRadius: 10,
  },
  progressTitle: {
    flex: 1,
    fontFamily: "Lato-Bold",
    fontSize: 16,
    paddingTop: 12,
    paddingHorizontal: 2,
  },
  progressPhotosContainer: {
    flex: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 6,
    paddingTop: 8,
  },
  progressLeftPhoto: {
    height: "100%",
    width: "63%",
    marginRight: 2,
    backgroundColor: "deepskyblue",
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  progressRightPhotosContainer: {
    height: "100%",
    width: "36%",
    paddingLeft: 3,
  },
  progressPhotoTopRight: {
    marginBottom: 3,
    flex: 1,
    backgroundColor: "deepskyblue",
    borderTopRightRadius: 6,
  },
  progressPhotoBottomRight: {
    marginTop: 3,
    flex: 1,
    backgroundColor: "deepskyblue",
    borderBottomRightRadius: 6,
  },
  //#endregion
});
