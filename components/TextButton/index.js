import React from "react";
import { TouchableOpacity, Text } from "react-native";
function index({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}

export default index;
