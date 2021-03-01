import { AsyncStorage } from "react-native";
import { CALENDER_STORAGE_KEY } from "./_calender";

export const submitEntry = ({ key, entry }) => {
  return AsyncStorage.mergeItem(
    CALENDER_STORAGE_KEY,
    JSON.stringify({
      [key]: entry,
    })
  );
};

export const removeEntry = async (key) => {
  try {
    const items = JSON.parse(await AsyncStorage.getItem(CALENDER_STORAGE_KEY));
    items[key] = undefined;
    delete items[key];
    return await AsyncStorage.setItem(
      CALENDER_STORAGE_KEY,
      JSON.stringify(items)
    );
  } catch (e) {
    console.log({ e });
  }
};
