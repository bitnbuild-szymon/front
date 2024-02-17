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
import tasksJSON from "../static/tasks.json";
import trainings from "../static/trainings.json";

type TaskProps = {
  name: string;
  muscles: { name: string; value: number }[];
};

type Set = {
  reps: number;
  mass: number;
  completed: boolean;
};

type Task = {
  props: TaskProps;
  sets: Set[];
};

export default function Training() {
  const [scrollViewHeight, setScrollViewHeight] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([tasksJSON] as unknown as Task[]);
  const [currentTask, setCurrentTask] = useState<Task | null>();

  useEffect(() => {
    const training = trainings["chest workout"];
    setTasks(
      training.tasks.map((el) => {
        return {
          props: tasksJSON[el.id as keyof object],
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
              tasks?.map((task, i) => {
                return (
                  <TouchableWithoutFeedback
                    key={i}
                    onPress={() => setCurrentTask(task)}
                  >
                    <View
                      style={[
                        styles.taskContainer,
                        {
                          width: screenWidth - 20,
                          height: scrollViewHeight / 6 - 10 - 10 / 6,
                        },
                      ]}
                    >
                      <View style={styles.taskTextContainer}>
                        <Text style={styles.taskNameText}>
                          {task.props.name[0].toUpperCase() +
                            task.props.name.slice(1)}
                        </Text>
                        <Text style={styles.taskAmountText}>
                          {`${0} of ${task.sets.length}`}
                        </Text>
                      </View>
                      <View style={styles.taskBodyContainer}>
                        <Text>muscles image</Text>
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
        {currentTask ? (
          <View style={styles.currentTaskContainer}>
            <TouchableWithoutFeedback onPress={() => setCurrentTask(null)}>
              <View style={styles.currentTaskBackground} />
            </TouchableWithoutFeedback>

            <View style={styles.currentTaskContent}>
              <View style={styles.currentTaskBodyContainer}>
                <Text>muscles image</Text>
              </View>
              <View style={{ flex: 1, paddingVertical: 4 }}>
                {currentTask.sets.map((set, i) => {
                  return (
                    <View key={i} style={styles.currentTaskTextContainer}>
                      <Text style={styles.currentTaskIndex}>{i + 1}.</Text>
                      <Text style={styles.currentTaskPreviousText}>
                        8 x 47.5 kg
                      </Text>
                      <Text style={styles.currentTaskText}>{set.mass} kg</Text>
                      <Text style={styles.currentTaskText}>
                        {set.reps} reps
                      </Text>
                      <View style={styles.currentTaskCompleted} />
                    </View>
                  );
                })}
              </View>
              <TouchableWithoutFeedback>
                <View style={styles.currentTaskButton}>
                  <Text style={styles.currentTaskButtonText}>start</Text>
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

  //#region tasks
  taskContainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },
  taskTextContainer: {
    flex: 4,
    height: "100%",
    marginRight: 8,
    marginLeft: 2,
  },
  taskNameText: {
    color: colors.darkBlack,
    fontFamily: "Lato-Bold",
    fontSize: 14,
  },
  taskAmountText: {
    color: colors.darkGray,
    fontFamily: "Lato-Bold",
    fontSize: 12,
    marginTop: 4,
  },
  taskBodyContainer: {
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

  //#region current task
  currentTaskContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  currentTaskBackground: {
    backgroundColor: colors.darkBlack,
    opacity: 0.85,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  currentTaskContent: {
    width: screenWidth - 24,
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 8,
    gap: 12,
    flex: 0.825,
  },
  currentTaskBodyContainer: {
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: colors.darkGray,
    elevation: 10,
  },
  currentTaskTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentTaskIndex: {
    width: 24,
    fontFamily: "Lato-Bold",
    fontSize: 14,
  },
  currentTaskText: {
    flex: 1,
    fontFamily: "Lato-Bold",
    textAlign: "center",
    fontSize: 14,
    color: colors.darkBlack,
  },
  currentTaskPreviousText: {
    flex: 2,
    fontFamily: "Lato-Bold",
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGray,
  },
  currentTaskCompleted: {
    marginLeft: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "green",
  },
  currentTaskButton: {
    width: "100%",
    height: 64,
    backgroundColor: colors.blue,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  currentTaskButtonText: {
    color: colors.white,
    textTransform: "uppercase",
    fontFamily: "Lato-Bold",
    fontSize: 20,
  },
  //#endregion
});
