import React from "react";
import { View, Text, Slider } from "react-native";
function index({ onChange, value, max, step, unit }) {
  return (
    <View>
      <Slider
        onValueChange={onChange}
        value={value}
        maximumValue={max}
        minimumValue={0}
        step={step}
      />
      <Text>{value}</Text>
      <Text>{unit}</Text>
    </View>
  );
}

export default index;
