import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../colors";
import Body from "./Body";
import { Exercise } from "./Training";
import { addWorkout, getExercise, getExercisesIds } from "bitnbuild-back";
import { useNavigation } from "@react-navigation/native";

interface ExerciseItem {
  id: number;
  data: Exercise;
}

export default function NewWorkout() {
  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const [exercises, setExercises] = useState<ExerciseItem[]>();
  const [currentExercise, setCurrentExercise] = useState<ExerciseItem | null>(
    null,
  );
  const [selected, setSelected] = useState<number[]>();

  const navigator = useNavigation();

  useEffect(() => {
    (async () => {
      const ids = await getExercisesIds();
      const excercises: ExerciseItem[] = [];
      for (let i = 0; i < ids.length; i++) {
        excercises.push({ id: i, data: await getExercise(ids[i]) });
      }
      setExercises(excercises);
    })();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.darkBlack} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>create &nbsp;workout</Text>
        </View>
        <View style={styles.contentContainer}>
          {exercises
            ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                onLayout={({ nativeEvent }) =>
                  setScrollViewHeight(nativeEvent.layout.height)}
                contentContainerStyle={styles.scrollView}
              >
                {scrollViewHeight == 0 ? <></> : (
                  exercises?.map((exercise, i) => {
                    return (
                      <TouchableWithoutFeedback
                        key={i}
                        onPress={() => setCurrentExercise(exercise)}
                      >
                        <View
                          style={[
                            styles.exerciseContainer,
                            {
                              width: screenWidth - 20,
                              height: scrollViewHeight / 6 - 10 - 10 / 6,
                              backgroundColor: selected?.includes(i)
                                ? colors.darkGreen
                                : colors.lightGray,
                            },
                          ]}
                        >
                          <View style={styles.exerciseTextContainer}>
                            <Text style={styles.exerciseNameText}>
                              {exercise.data.name[0].toUpperCase() +
                                exercise.data.name.slice(1)}
                            </Text>
                            <Text style={styles.exerciseAmountText}>
                              {exercise.data.description}
                            </Text>
                          </View>
                          <View style={styles.exerciseBodyContainer}>
                            <Body muscles={exercise.data.muscles} />
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })
                )}
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await addWorkout({
                        name: "test",
                        exercises: selected?.map((i) => exercises[i].data),
                      });
                    } catch (e) {
                    }
                    navigator.goBack();
                  }}
                >
                  <View
                    style={[
                      styles.currentExcerciseButton,
                      styles.exerciseContainer,
                      {
                        backgroundColor: colors.blue,
                        width: screenWidth - 20,
                        height: scrollViewHeight / 6 - 10 - 10 / 6,
                      },
                    ]}
                  >
                    <Text style={styles.currentExcerciseButtonText}>
                      publish workout
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            )
            : (
              <View style={styles.iconContainer}>
                <ActivityIndicator size={32} color={colors.blue} />
              </View>
            )}
        </View>
      </View>
      <>
        {currentExercise
          ? (
            <View style={styles.currentExcerciseContainer}>
              <TouchableWithoutFeedback
                onPress={() => setCurrentExercise(null)}
              >
                <View style={styles.currentExcerciseBackground} />
              </TouchableWithoutFeedback>
              <View style={styles.currentExcerciseContent}>
                <View style={styles.currentExcerciseBodyContainer}>
                  <Body muscles={currentExercise.data.muscles} />
                </View>
                <View style={styles.descriptionContainer}>
                  <Text>{currentExercise.data.description}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    const arr = selected ? selected : [];
                    const id = currentExercise.id;
                    if (arr.includes(id)) {
                      setSelected(arr.filter((i) => i != id));
                    } else setSelected([...arr, id]);
                  }}
                >
                  <View
                    style={[
                      styles.currentExcerciseButton,
                      {
                        backgroundColor: selected?.includes(currentExercise.id)
                          ? colors.darkGreen
                          : colors.blue,
                      },
                    ]}
                  >
                    <Text style={styles.currentExcerciseButtonText}>
                      {selected?.includes(currentExercise.id)
                        ? "remove from plan"
                        : "add to plan"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
          : <></>}
      </>
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
  iconContainer: { flex: 1, alignItems: "center", justifyContent: "center" },

  //#region exercises
  exerciseContainer: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },
  exerciseTextContainer: {
    flex: 4,
    height: "100%",
    marginRight: 8,
    marginLeft: 2,
  },
  exerciseNameText: {
    color: colors.darkBlack,
    fontFamily: "Lato-Bold",
    fontSize: 14,
  },
  exerciseAmountText: {
    color: colors.darkGray,
    fontFamily: "Lato-Bold",
    fontSize: 12,
    marginTop: 4,
  },
  exerciseBodyContainer: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: colors.blue,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
    borderRadius: 6,
  },
  //#endregion

  //#region current excercise
  currentExcerciseContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  currentExcerciseBackground: {
    backgroundColor: colors.darkBlack,
    opacity: 0.85,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  currentExcerciseContent: {
    width: screenWidth - 24,
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 12,
    flex: 0.825,
  },
  currentExcerciseBodyContainer: {
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: colors.darkGray,
    elevation: 10,
  },
  descriptionContainer: {
    flex: 1,
    paddingVertical: 4,
    position: "relative",
  },
  currentExcerciseButton: {
    width: "100%",
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  currentExcerciseButtonText: {
    color: colors.white,
    textTransform: "uppercase",
    fontFamily: "Lato-Bold",
    fontSize: 20,
  },
  //#endregion
});
