import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import StarRating from "./StarRating";

import server from "../../constants/server.js";

export default function ProductCard({
  key_id,
  title,
  rating,
  price,
  image,
  setScreen,
  setSelectedProductId,
  AddToCart,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedProductId(key_id);
        setScreen("product_details");
      }}
    >
      <Image
        source={{ uri: `${server.host}${image}` }}
        style={styles.productImage}
      />

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>

        <StarRating rating={rating} />

        <Text style={styles.price}>${price}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => {
              AddToCart(key_id);
            }}
          >
            <Feather name="shopping-cart" size={16} color="#fff" />
            <Text style={styles.cartText}>Add To Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heartBtn}>
            <Feather name="heart" size={18} color="#3A4FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    borderRadius: 15,
    backgroundColor: "#eee",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 6,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartBtn: {
    flexDirection: "row",
    backgroundColor: "#3A4FFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  cartText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "500",
  },
  heartBtn: {
    backgroundColor: "#3A4FFF ",
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginLeft: 10,
  },
});
