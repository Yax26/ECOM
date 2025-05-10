// components/Homepage/FeatureGrid.js
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.9;

function FeatureGrid({ title, imageKey, onPressShop }) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageKey,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPressShop} style={styles.linkContainer}>
        <Text style={styles.linkText}>Shop All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    height: "100%",
  },
  image: {
    width: "100%",
    height: "83%",
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  linkContainer: {
    alignSelf: "flex-end",
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007BFF",
  },
});

export default FeatureGrid;
