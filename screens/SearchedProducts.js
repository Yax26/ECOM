import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from "react-native";
import SearchContainer from "../components/Homepage/SearchContainer";
import ProductCard from "../components/SearchedProducts/ProductCard";
import BottomOptionMenu from "../components/Homepage/BottomOptionMenu";
import MenuModal from "../components/common/MenuModal";
import { useState } from "react";
import FilterMenu from "../components/SearchedProducts/FilterMenu";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function SearchedProducts({
  searchedWord,
  setSearchedWord,
  searchedData,
  setSearchedData,
  setScreen,
  menuVisibility,
  setMenuVisibility,
  setSelectedProductId,
  AddToCart,
  cartIconNumber,
}) {
  const [filtersVisibility, setFiltersVisibility] = useState(false);
  return (
    <View style={styles.rootContainer}>
      {/* Search Bar */}
      <View style={styles.searchStyle}>
        <SearchContainer
          searchedWord={searchedWord}
          setSearchedWord={setSearchedWord}
          setSearchedData={setSearchedData}
          setScreen={setScreen}
        />
      </View>

      {/* Scrollable Product List */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {searchedData.map((product) => {
          return (
            <ProductCard
              key={product.product_id}
              key_id={product.product_id}
              title={product.product_name}
              rating={product.product_rating}
              price={product.product_price}
              image={product.product_image}
              setScreen={setScreen}
              setSelectedProductId={setSelectedProductId}
              AddToCart={AddToCart}
            />
          );
        })}

        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>1 2 3 ... 7</Text>
        </View>
      </ScrollView>

      <View style={styles.filterButtonContainer}>
        <Pressable
          style={styles.filterButton}
          onPress={() => setFiltersVisibility(true)}
        >
          <Text style={styles.filterText}>
            <FontAwesome name="filter" size={20} color="#fff" /> FILTERS
          </Text>
        </Pressable>
      </View>

      <FilterMenu
        visible={filtersVisibility}
        onClose={() => setFiltersVisibility(false)}
      />

      <MenuModal
        visible={menuVisibility}
        setScreen={setScreen}
        onClose={() => setMenuVisibility(false)}
      />

      <BottomOptionMenu
        setMenuVisibility={setMenuVisibility}
        setScreen={setScreen}
        cartIconNumber={cartIconNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchStyle: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // ensure space for bottom nav and floating button
  },
  paginationContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  paginationText: {
    fontSize: 16,
    color: "#888",
  },
  filterButtonContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterButton: {
    backgroundColor: "#210b16",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  filterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SearchedProducts;
