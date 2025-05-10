import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import SearchedProducts from "./screens/SearchedProducts";
import FilterMenu from "./components/SearchedProducts/FilterMenu";
export default function App() {
  const [searchedWord, setSearchedWord] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [screen, setScreen] = useState("filters");
  const [menuVisibility, setMenuVisibility] = useState(false);

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
      />
    );
  }
  // filters
  if (screen === "filters") {
    result = <FilterMenu />;
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
  },
  scrollContent: {
    flexGrow: 1,
  },
});
