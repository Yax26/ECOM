import { View, StyleSheet, TextInput, Alert } from "react-native";
import PrimaryButton from "../PrimaryButton.js";
import server from "../../constants/server.js";

function SearchContainer({
  searchedWord,
  setSearchedWord,
  setSearchedData,
  setScreen,
}) {
  const handleSearch = async () => {
    console.log(server);
    if (!searchedWord) {
      return Alert.alert("Please enter a product name");
    }
    try {
      const res = await fetch(
        `${server.host}/products/search/?search=${searchedWord}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      console.log(json.status.code);

      if (json?.status?.code === 200) {
        setScreen("searched");
        setSearchedData(json?.data);
      } else {
        Alert.alert("Error", json?.status?.message, [
          { text: "okay!", style: "destructive", onPress: resetHandler },
        ]);
      }
    } catch (err) {
      console.log("hii");
      Alert.alert("Network error", err.message);
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        value={searchedWord}
        onChangeText={setSearchedWord}
      />
      <PrimaryButton onPress={handleSearch}>🔍</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    marginTop: 70,
    marginHorizontal: 15,
  },
  searchButton: {
    flex: 1,
  },

  searchInput: {
    flex: 2,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
    width: 10,
    borderColor: "#ffbf39",
    borderWidth: 1,
  },
});

export default SearchContainer;
