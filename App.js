import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import SearchedProducts from "./screens/SearchedProducts";
import FilterMenu from "./components/SearchedProducts/FilterMenu";
import ProductDetails from "./screens/ProductDetails";

export default function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [screen, setScreen] = useState("home");
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  let result = "";

  if (screen === "home") {
    result = (
      <Homepage
        setScreen={setScreen}
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        setSearchedData={setSearchedData}
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
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
      />
    );
  }
  // filters
  if (screen === "filters") {
    result = <FilterMenu />;
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
