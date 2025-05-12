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
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RadioButton } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";

function FilterMenu({ visible, setScreen, onClose }) {
  const [price, setPrice] = useState([0, 2000]);
  const [isSelected, setSelection] = useState({});
  const [value, setValue] = React.useState("first");

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.filterBox}>
          <ScrollView>
            <View style={styles.closeButton}>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={28} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterContainer}>
              <Text style={styles.sectionTitle}>Price</Text>
              <Text style={styles.priceText}>
                ${price[0]} - ${price[1]}
              </Text>
              <Slider
                style={{ width: 200, height: 30 }}
                minimumValue={0}
                maximumValue={8000}
                step={100}
                minimumTrackTintColor="#3b7df0"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#3b7df0"
                onValueChange={(value) => setPrice([value, 8000])}
                value={price[0]}
              />
            </View>

            <View style={styles.sortContainer}>
              <Text style={styles.sectionTitle}>SORT BY</Text>
              <RadioButton.Group onValueChange={setValue} value={value}>
                <RadioButton.Item
                  label="Top-Rated"
                  value="first"
                  labelStyle={styles.radioLabel}
                />
                <RadioButton.Item
                  label="Price (Max-Min)"
                  value="second"
                  labelStyle={styles.radioLabel}
                />
                <RadioButton.Item
                  label="Price (Min-Max)"
                  value="third"
                  labelStyle={styles.radioLabel}
                />
                <RadioButton.Item
                  label="Popularity"
                  value="fourth"
                  labelStyle={styles.radioLabel}
                />
                <RadioButton.Item
                  label="Discount"
                  value="fifth"
                  labelStyle={styles.radioLabel}
                />
              </RadioButton.Group>
            </View>

            <View style={styles.ratingContainer}>
              <Text style={styles.sectionTitle}>FILTER</Text>
              {[5, 4, 3, 2, 1].map((stars) => (
                <View key={stars} style={styles.starRow}>
                  <View style={styles.starIcons}>
                    {[...Array(stars)].map((_, i) => (
                      <FontAwesome
                        key={i}
                        name="star"
                        size={14}
                        color="#f1c40f"
                      />
                    ))}
                  </View>
                  <Switch
                    value={isSelected[stars]}
                    onValueChange={(value) =>
                      setSelection((prev) => ({ ...prev, [stars]: value }))
                    }
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  />
                </View>
              ))}
            </View>

            <View style={styles.selectButton}>
              <Pressable style={styles.doneButton}>
                <Text style={styles.doneText}>DONE</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default FilterMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    height: "70%",
  },
  filterBox: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flex: 1,
  },
  closeButton: {
    alignItems: "flex-end",
    marginTop: 20,
  },

  filterContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  sortContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  ratingContainer: {
    marginBottom: 15,
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
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
    width: 180,
  },
  starIcons: {
    flexDirection: "row",
  },
  selectButton: {
    alignItems: "center",
    marginTop: 15,
  },
  doneButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  doneText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  radioLabel: {
    fontSize: 13,
  },
});
