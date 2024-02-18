import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getOwnedWorkoutsIds,
  getSharedWorkouts,
  getWorkout,
  getWorkoutsIds,
} from "bitnbuild-back";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../colors";
import Body from "./Body";
import CurrentExcercise from "./CurrentExcercise";
import { useNavigation } from "@react-navigation/native";
import WorkoutSelector from "./WorkoutSelector";

export enum ExerciseState {
  INPROGRESS,
  READY,
  BREAK,
}

interface Set {
  reps: number;
  mass: number;
  completed: boolean;
}

export interface Exercise {
  name: string;
  description: string;
  setsCompleted: number;
  muscles: { [key: string]: number };
  breakTime: number;
  sets: Set[];
}

export default function Training({ route }) {
  const [workout, setWorkout] = useState<any>();
  const [ownWorkouts, setOwnWorkouts] = useState<any[]>();
  const [sharedWorkouts, setSharedWorkouts] = useState<any[]>();

  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const [exercises, setExercises] = useState<Exercise[]>();
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>();
  const [exerciseState, setExerciseState] = useState<ExerciseState>(
    ExerciseState.READY,
  );
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        setOwnWorkouts(await getOwnedWorkoutsIds(route.params.profile.id));
        setSharedWorkouts(await getSharedWorkouts(route.params.profile.id));
      } catch (e) {
      }
    })();
  }, [route.params?.profile?.id]);

  useEffect(() => {
    (async () => {
      try {
        const training = await getWorkout(workout.id || "");
        setExercises(
          training.exercises.map((el: Exercise) => ({
            ...el,
            setsCompleted: 0,
          })),
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, [workout]);

  if (!workout) {
    return (
      <>
        <StatusBar backgroundColor={colors.darkBlack} />
        <View style={styles.container}>
          <Text style={styles.choose}>Choose a workout</Text>

          <WorkoutSelector
            setWorkout={setWorkout}
            ownWorkouts={ownWorkouts}
            sharedWorkouts={sharedWorkouts}
          />
        </View>
      </>
    );
  }

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
                        },
                      ]}
                    >
                      <View style={styles.exerciseTextContainer}>
                        <Text style={styles.exerciseNameText}>
                          {exercise.name[0].toUpperCase() +
                            exercise.name.slice(1)}
                        </Text>
                        <Text style={styles.exerciseAmountText}>
                          {`${exercise.setsCompleted} of ${exercise.sets.length}`}
                        </Text>
                      </View>
                      <View style={styles.exerciseBodyContainer}>
                        <Body muscles={exercise.muscles} />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })
            )}
          </ScrollView>
        </View>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("NewWorkout" as never)}
        >
          <AntDesign
            name="pluscircle"
            size={48}
            color={colors.blue}
            style={{ position: "absolute", right: 12, bottom: 16 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <>
        {currentExercise
          ? (
            <>
              <View
                style={{
                  backgroundColor: colors.darkGreen,
                  width: "100%",
                  height: 20,
                }}
              />
              <CurrentExcercise
                currentExercise={currentExercise}
                clearCurrentExcercise={() => setCurrentExercise(null)}
                exerciseState={exerciseState}
                setExerciseState={setExerciseState}
              />
            </>
          )
          : <></>}
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
});
