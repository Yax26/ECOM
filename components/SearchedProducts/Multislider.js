import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useState } from "react";
import * as React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
function MultiSliderFilter(props) {
  const [price, setPrice] = useState([0, 8000]);
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.sectionTitle}>Price</Text>
      <Text style={styles.priceText}>
        ${price[0]} - ${price[1]}
      </Text>
      <MultiSlider
        values={price}
        onValuesChange={setPrice}
        min={0}
        max={8000}
        step={100}
        selectedStyle={{ backgroundColor: "#3b7df0" }}
        unselectedStyle={{ backgroundColor: "#d3d3d3" }}
        markerStyle={{
          backgroundColor: "#3b7df0",
          height: 20,
          width: 20,
          alignSelf: "center",
          marginRight: 20,
          borderRadius: 10,
        }}
        containerStyle={{ alignSelf: "center", width: 250 }}
      />
    </View>
  );
}

export default MultiSliderFilter;

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
  },
  priceText: {
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 8,
  },
});
