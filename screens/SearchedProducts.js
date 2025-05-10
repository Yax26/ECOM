import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import SearchContainer from "../components/Homepage/SearchContainer";
import ProductCard from "../components/SearchedProducts/ProductCard";
import BottomOptionMenu from "../components/Homepage/BottomOptionMenu";
import MenuModal from "../components/common/MenuModal";

function SearchedProducts({
  searchedWord,
  setSearchedWord,
  searchedData,
  setSearchedData,
  setScreen,
  menuVisibility,
  setMenuVisibility,
}) {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.searchStyle}>
        <SearchContainer
          searchedWord={searchedWord}
          setSearchedWord={setSearchedWord}
          setSearchedData={setSearchedData}
          setScreen={setScreen}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {searchedData.map((product) => {
          return (
            <ProductCard
              key={product.product_id}
              title={product.product_name}
              rating={product.product_rating}
              price={product.product_price}
              image={product.product_image}
            />
          );
        })}
      </ScrollView>
      <MenuModal
        visible={menuVisibility}
        setScreen={setScreen}
        onClose={() => setMenuVisibility(false)}
      />

      <BottomOptionMenu
        setMenuVisibility={setMenuVisibility}
        setScreen={setScreen}
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
    padding: 40,
  },
  text: {
    fontSize: 24,
    marginVertical: 20,
  },
});
export default SearchedProducts;
