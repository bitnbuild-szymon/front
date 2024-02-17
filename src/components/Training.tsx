import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import colors from "../../colors";
import exercisesJSON from "../static/exercises.json";
import trainings from "../static/trainings.json";
import Body from "./Body";

enum ExerciseState {
  INPROGRESS,
  READY,
  BREAK,
}

interface ExerciseProps {
  name: string;
  description: string;
  setsCompleted: number;
  muscles: { name: string; value: number }[];
}

interface Set {
  reps: number;
  mass: number;
  completed: boolean;
}

interface Exercise {
  props: ExerciseProps;
  breakTime: number;
  sets: Set[];
}

export default function Training() {
  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const [exercises, setExercises] = useState<Exercise[]>();
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>();
  const [exerciseState, setExerciseState] = useState<ExerciseState>(
    ExerciseState.READY
  );

  useEffect(() => {
    const training = trainings["chest workout"];
    setExercises(
      training.exercises.map((el) => {
        return {
          breakTime: el.breakTime,
          props: {
            ...(exercisesJSON[el.id as keyof object] as object),
            setsCompleted: 0,
          } as ExerciseProps,
          sets: el.sets as Set[],
        };
      })
    );
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.darkBlack} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>training</Text>
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
                        },
                      ]}
                    >
                      <View style={styles.exerciseTextContainer}>
                        <Text style={styles.exerciseNameText}>
                          {exercise.props.name[0].toUpperCase() +
                            exercise.props.name.slice(1)}
                        </Text>
                        <Text style={styles.exerciseAmountText}>
                          {`${0} of ${exercise.sets.length}`}
                        </Text>
                      </View>
                      <View style={styles.exerciseBodyContainer}>
                        <Body muscles={exercise.props.muscles} />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
      <>
        {currentExercise ? (
          <View style={styles.currentExcerciseContainer}>
            <TouchableWithoutFeedback onPress={() => setCurrentExercise(null)}>
              <View style={styles.currentExcerciseBackground} />
            </TouchableWithoutFeedback>
            <View style={styles.currentExcerciseContent}>
              <View style={styles.currentExcerciseBodyContainer}>
                <Body muscles={currentExercise.props.muscles} />
              </View>
              <View
                style={{ flex: 1, paddingVertical: 4, position: "relative" }}
              >
                {currentExercise.sets.map((set, i) => {
                  return (
                    <View key={i} style={styles.currentExcerciseTextContainer}>
                      <Text style={styles.currentExcerciseIndex}>{i + 1}.</Text>
                      <Text style={styles.currentExcercisePreviousText}>
                        8 x 47.5 kg
                      </Text>
                      <Text style={styles.currentExcerciseText}>
                        {set.mass} kg
                      </Text>
                      <Text style={styles.currentExcerciseText}>
                        {set.reps} reps
                      </Text>
                      <View
                        style={[
                          styles.currentExcerciseCompleted,
                          {
                            backgroundColor:
                              currentExercise.props.setsCompleted > i
                                ? "green"
                                : colors.darkGray,
                          },
                        ]}
                      />
                      {currentExercise.props.setsCompleted > i ? (
                        <View style={styles.currentExcerciseCompletedLine} />
                      ) : (
                        <></>
                      )}
                    </View>
                  );
                })}
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (exerciseState == ExerciseState.BREAK) return;
                  else if (exerciseState == ExerciseState.READY)
                    setExerciseState(ExerciseState.INPROGRESS);
                  else if (exerciseState == ExerciseState.INPROGRESS) {
                    setExerciseState(ExerciseState.BREAK);
                    currentExercise.props.setsCompleted += 1;
                    setTimeout(() => {
                      setExerciseState(ExerciseState.READY);
                    }, currentExercise.breakTime * 1000);
                  }
                }}
              >
                <View
                  style={[
                    styles.currentExcerciseButton,
                    {
                      backgroundColor:
                        currentExercise.props.setsCompleted ==
                        currentExercise.sets.length
                          ? "green"
                          : colors.blue,
                    },
                  ]}
                >
                  <Text style={styles.currentExcerciseButtonText}>
                    {currentExercise.props.setsCompleted ==
                    currentExercise.sets.length
                      ? "completed"
                      : exerciseState != ExerciseState.INPROGRESS
                      ? exerciseState == ExerciseState.BREAK
                        ? "take a break"
                        : "start"
                      : "stop"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : (
          <></>
        )}
      </>
    </>
  );
}

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  //#region containers
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
    // paddingTop: 4,
  },
  contentContainer: {
    flex: 10,
    width: screenWidth,
    backgroundColor: colors.whitesmoke,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  scrollView: {
    paddingVertical: 10,
    gap: 10,
    alignItems: "center",
  },
  //#endregion

  //#region exercises
  exerciseContainer: {
    backgroundColor: colors.lightGray,
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

  //#region current exercise
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
  currentExcerciseTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentExcerciseIndex: {
    width: 24,
    fontFamily: "Lato-Bold",
    fontSize: 14,
  },
  currentExcerciseText: {
    flex: 1,
    fontFamily: "Lato-Bold",
    textAlign: "center",
    fontSize: 14,
    color: colors.darkBlack,
  },
  currentExcercisePreviousText: {
    flex: 2,
    fontFamily: "Lato-Bold",
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGray,
  },
  currentExcerciseCompleted: {
    marginLeft: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  currentExcerciseCompletedLine: {
    position: "absolute",
    backgroundColor: colors.darkGray,
    top: "50%",
    height: 1,
    width: screenWidth - 72,
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
