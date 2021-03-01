import React from "react";
import { View, Text } from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export const timeToString = (time = new Date()) => {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
};

export const getMetricMetaInfo = (metric) => {
  const info = {
    run: {
      displayName: "Run",
      max: 50,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon: () => {
        return (
          <View>
            <MaterialIcons name={"directions-run"} size={35} color={"black"} />
          </View>
        );
      },
    },
    bike: {
      displayName: "Bike",
      max: 100,
      unit: "miles",
      step: 1,
      type: "steppers",
      getIcon: () => {
        return (
          <View>
            <MaterialCommunityIcons name={"bike"} size={35} color={"black"} />
          </View>
        );
      },
    },

    swim: {
      displayName: "Swim",
      max: 9900,
      unit: "meters",
      step: 100,
      type: "steppers",
      getIcon: () => {
        return (
          <View>
            <MaterialCommunityIcons name={"swim"} size={35} color={"black"} />
          </View>
        );
      },
    },
    sleep: {
      displayName: "Sleep",
      max: 24,
      unit: "hours",
      step: 1,
      type: "slider",
      getIcon: () => {
        return (
          <View>
            <FontAwesome5 name={"bed"} size={35} color={"black"} />
          </View>
        );
      },
    },
    eat: {
      displayName: "Eat",
      max: 10,
      unit: "rating",
      step: 1,
      type: "slider",
      getIcon: () => {
        return (
          <View>
            <MaterialCommunityIcons name="food" size={35} color="black" />
          </View>
        );
      },
    },
  };

  // console.log({ metric });

  return typeof metric === "undefined" ? info : info[metric];
};

export const dailyReminderValue = () => {
  return {
    today: "🔥 Dont forget to log your data today",
  };
};
