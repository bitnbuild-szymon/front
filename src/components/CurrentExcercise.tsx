import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import Body from "./Body";
import colors from "../../colors";
import { Exercise, ExerciseState } from "./Training";

interface ExerciseProps {
  currentExercise: Exercise;
  clearCurrentExcercise: () => void;
  exerciseState: ExerciseState;
  setExerciseState: (state: ExerciseState) => void;
}

export default function CurrentExcercise({
  currentExercise,
  clearCurrentExcercise,
  exerciseState,
  setExerciseState,
}: ExerciseProps) {
  return (
    <View style={styles.currentExcerciseContainer}>
      <TouchableWithoutFeedback onPress={() => clearCurrentExcercise()}>
        <View style={styles.currentExcerciseBackground} />
      </TouchableWithoutFeedback>
      <View style={styles.currentExcerciseContent}>
        <View style={styles.currentExcerciseBodyContainer}>
          <Body muscles={currentExercise.muscles} />
        </View>
        <View style={{ flex: 1, paddingVertical: 4, position: "relative" }}>
          {currentExercise.sets.map((set, i) => {
            return (
              <View key={i} style={styles.currentExcerciseTextContainer}>
                <Text style={styles.currentExcerciseIndex}>{i + 1}.</Text>
                <Text style={styles.currentExcercisePreviousText}>
                  8 x 47.5 kg
                </Text>
                <Text style={styles.currentExcerciseText}>{set.mass} kg</Text>
                <Text style={styles.currentExcerciseText}>{set.reps} reps</Text>
                <View
                  style={[
                    styles.currentExcerciseCompleted,
                    {
                      backgroundColor:
                        currentExercise.setsCompleted > i
                          ? "green"
                          : colors.darkGray,
                    },
                  ]}
                />
                {currentExercise.setsCompleted > i ? (
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
              currentExercise.setsCompleted += 1;
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
                  currentExercise.setsCompleted == currentExercise.sets.length
                    ? "green"
                    : colors.blue,
              },
            ]}
          >
            <Text style={styles.currentExcerciseButtonText}>
              {currentExercise.setsCompleted == currentExercise.sets.length
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
  );
}

const screenWidth = Dimensions.get("screen").width;
const styles = StyleSheet.create({
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
});
