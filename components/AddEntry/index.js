import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  dailyReminderValue,
  getMetricMetaInfo,
  timeToString,
} from "../../utils/helpers";
import UdaciSteper from "./UdaciSteper";
import UdaciSlider from "./UdaciSlider";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "../TextButton/index";
import { removeEntry, submitEntry } from "../../utils/api";
import { addEntry } from "../../redux/actionDispature/actionDispature";

import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}

function index({ alreadyLogged, dispatch }) {
  const [metricValue, setMetricValue] = useState({
    run: 0,
    bike: 10,
    swim: 0,
    sleep: 40,
    eat: 0,
  });

  const increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    const count = metricValue[metric] + step;
    setMetricValue({
      ...metricValue,
      [metric]: count > max ? max : count,
    });
  };
  const decrement = (metric) => {
    const count = metricValue[metric] - getMetricMetaInfo(metric).step;
    setMetricValue({
      ...metricValue,
      [metric]: count < 0 ? 0 : count,
    });
  };

  const slide = (metric, value) => {
    console.log({ value });
    setMetricValue({
      ...metricValue,
      [metric]: value,
    });
  };

  const _submit = () => {
    const key = timeToString();
    // console.log({ key });

    // Update Redux

    dispatch(addEntry({ [key]: metricValue }));

    setMetricValue({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 });

    //Navigate to home

    //Save in db

    submitEntry({ key, entry: metricValue });

    //clean local notification
  };

  const _reset = () => {
    const key = timeToString();

    // Update redux

    dispatch(
      addEntry({
        [key]: dailyReminderValue(),
      })
    );

    //route to home

    //Update Db
    removeEntry(key);
  };

  const metaInfo = getMetricMetaInfo();
  return (
    <>
      {alreadyLogged ? (
        <>
          <View>
            <Ionicons name="ios-happy-outline" size={100} color="black" />
            <Text>You already logged your information today</Text>
            <TextButton onPress={_reset}>Reset</TextButton>
          </View>
        </>
      ) : (
        <ScrollView>
          <View>
            <DateHeader date={new Date().toLocaleDateString()} />
            {Object.keys(metaInfo).map((key) => {
              const { getIcon, type, ...rest } = getMetricMetaInfo(key);

              const value = metricValue[key];
              return (
                <View key={key}>
                  {getIcon()}
                  {type === "steppers" ? (
                    <UdaciSteper
                      value={value}
                      onIncrement={() => increment(key)}
                      onDecrement={() => decrement(key)}
                      {...rest}
                    />
                  ) : (
                    <UdaciSlider
                      value={value}
                      onChange={(value) => slide(key, value)}
                      {...rest}
                    />
                  )}
                </View>
              );
            })}
            <SubmitBtn onPress={_submit} />
          </View>
        </ScrollView>
      )}
    </>
  );
}

function mapStateToProps(state) {
  let key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === "undefined",
  };
}

export default connect(mapStateToProps)(index);
