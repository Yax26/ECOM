import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";

import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import SearchedProducts from "./screens/SearchedProducts";
import FilterMenu from "./components/SearchedProducts/FilterMenu";
import ProductDetails from "./screens/ProductDetails";
import ShoppingCart from "./screens/ShoppingCart";
import server from "./constants/server";

export default function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [screen, setScreen] = useState("home");
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartIconNumber, setCartIconNumber] = useState(0);

  let result = "";

  const AddToCart = async (selectedProductId) => {
    const token = await AsyncStorage.getItem("auth_token");
    try {
      const res = await fetch(`${server.host}/cart/management/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: selectedProductId }),
      });
      const json = await res.json();

      if (json?.status?.code === 201) {
        setScreen("home");
      } else {
        Alert.alert("Error", json?.status?.message, [
          { text: "okay!", style: "destructive", onPress: resetHandler },
        ]);
      }
    } catch (err) {
      Alert.alert("Network error", err.message);
    }
  };

  const getCartDetails = async () => {
    const token = await AsyncStorage.getItem("auth_token");
    try {
      const res = await fetch(`${server.host}/cart/management/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json?.status?.code === 200) {
        setCartIconNumber(json?.data?.products.length);
      } else {
      }
    } catch (err) {
      Alert.alert("Network error", err.message);
    }
  };
  getCartDetails();

  if (screen === "home") {
    result = (
      <Homepage
        setScreen={setScreen}
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        setSearchedData={setSearchedData}
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
        cartIconNumber={cartIconNumber}
      />
    );
  }

  if (screen === "login") {
    result = <Login setScreen={setScreen} />;
  }

  if (screen === "searched") {
    result = (
      <SearchedProducts
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        searchedData={searchedData}
        setSearchedData={setSearchedData}
        setScreen={setScreen}
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
        setSelectedProductId={setSelectedProductId}
        AddToCart={AddToCart}
        cartIconNumber={cartIconNumber}
      />
    );
  }

  if (screen === "filters") {
    result = <FilterMenu />;
  }

  if (screen === "cart") {
    result = (
      <ShoppingCart
        setMenuVisibility={setMenuVisibility}
        setScreen={setScreen}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        cartIconNumber={cartIconNumber}
        setCartIconNumber={setCartIconNumber}
      />
    );
  }

  if (screen === "product_details") {
    result = (
      <ProductDetails
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        setSearchedData={setSearchedData}
        setScreen={setScreen}
        setMenuVisibility={setMenuVisibility}
        menuVisibility={menuVisibility}
        selectedProductId={selectedProductId}
        AddToCart={AddToCart}
        cartIconNumber={cartIconNumber}
      />
    );
  }

  return (
    <View
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {result}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
  },
});
