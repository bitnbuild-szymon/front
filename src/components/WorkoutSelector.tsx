import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../colors";

import { getUser, getWorkout } from "bitnbuild-back";

export interface Workout {
  id?: string;
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  id?: string;
  name: string;
  description: string;
  breakTime: number;
  muscles: { [key: string]: number };
  sets: ExerciseSet[];
}

export interface ExerciseSet {
  reps: number;
  mass: number;
}

export default function WorkoutSelector(
  { setWorkout, ownWorkouts, sharedWorkouts },
) {
  const [sharedw, setSharedWorkouts] = useState<any[]>();
  const [ownw, setOwnWorkouts] = useState<any[]>();

  useEffect(() => {
    (async () => {
      const ow = [];
      for (const workout of ownWorkouts || []) {
        try {
          ow.push(await getWorkout(workout));
        } catch (e) {
          console.log(e);
        }
      }
      setOwnWorkouts(ow);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const sw = [];
      for (const workout of sharedWorkouts || []) {
        try {
          const wk = await getWorkout(workout.id);
          const user = await getUser(workout.by);

          sw.push({ user, workout: wk });
        } catch (e) {
          console.log(e);
        }
      }
      setSharedWorkouts(sw);
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={sharedw}
        keyExtractor={(item) => item.workout.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workoutContainer}
            onPress={() => setWorkout(item)}
          >
            <Text style={styles.challenged}>
              You've been challanged by {item.user.username}
            </Text>
            <Text style={styles.workoutName}>{item.workout.name}</Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={ownw}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workoutContainer}
            onPress={() => setWorkout(item)}
          >
            <Text style={styles.workoutName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  choose: {
    color: colors.white,
    fontSize: 20,
    backgroundColor: colors.darkBlack,
    padding: 10,
  },
  workoutContainer: {
    backgroundColor: colors.darkBlack,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  workoutName: {
    color: colors.white,
    fontSize: 20,
  },
  challenged: {
    color: colors.red,
    fontSize: 10,
  },
});
