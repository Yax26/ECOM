import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";

import server from "../constants/server.js";

import SearchContainer from "../components/Homepage/SearchContainer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PrimaryButton from "../components/PrimaryButton";
import BottomOptionMenu from "../components/Homepage/BottomOptionMenu.js";
import MenuModal from "../components/common/MenuModal.js";

import { useEffect, useState } from "react";
import ReviewCard from "../components/ProductDetails/ReviewCard.js";

function ProductDetails({
  searchedWord,
  setSearchedWord,
  setSearchedData,
  setScreen,
  setMenuVisibility,
  menuVisibility,
  selectedProductId,
  AddToCart,
  cartIconNumber,
}) {
  const [productDetails, setProductDetails] = useState("");
  let extraSpecs;
  const [extraSpecsVisibility, setExtraSpecsVisibility] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(
          `${server.host}/products/details/?product_id=${selectedProductId}`
        );
        const json = await res.json();

        if (json.status.code !== 200) {
          Alert.alert("Error", json?.status?.message, [
            { text: "okay!", style: "destructive" },
          ]);
        } else {
          setProductDetails(json.data);
        }
      } catch (e) {}
    };

    fetchProductDetails();
  }, []);

  let color = "";
  if (productDetails?.product_details?.product_rating > 3) {
    color = "#4CAF50";
  }
  if (productDetails?.product_details?.product_rating === 3) {
    color = "#FFBF39";
  }
  if (productDetails?.product_details?.product_rating < 3) {
    color = "#F44336";
  }
  return (
    <View style={styles.screenContainer}>
      <SearchContainer
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        setSearchedData={setSearchedData}
        setScreen={setScreen}
      />

      <View style={styles.rootContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero Section */}
          <View style={styles.heroContainer}>
            <Image
              source={{
                uri: `${server.host}${productDetails?.product_details?.product_image}`,
              }}
              style={styles.productImage}
            />

            <Text style={styles.productTitle}>
              {productDetails?.product_details?.product_name}
            </Text>

            <Text style={styles.price}>
              ${productDetails?.product_details?.product_price}
            </Text>

            <View style={styles.ratingRow}>
              <View
                style={[
                  styles.totalRatingContainer,
                  { backgroundColor: color },
                ]}
              >
                <FontAwesome
                  name="star"
                  size={20}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
                <Text style={{ fontSize: 18, marginLeft: 5 }}>
                  {productDetails &&
                    productDetails?.product_details?.product_rating}
                </Text>
              </View>

              <TouchableOpacity>
                <Text style={styles.totalReviewText}>
                  {productDetails.number_of_reviews} review(s)
                </Text>
              </TouchableOpacity>
            </View>

            <PrimaryButton
              additional_style={styles.OffersButton}
              font_style={{ fontSize: 17, fontWeight: "bold" }}
            >
              All offers & coupons
            </PrimaryButton>
          </View>

          {/* Description Sections */}
          <View style={styles.specificationsContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.specificationHeadingText}>
                Product Description
              </Text>
              <Text style={styles.specificationText}>
                {productDetails?.product_details?.product_description}
              </Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.specificationHeadingText}>
                Product Details
              </Text>
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: "row", paddingVertical: 8 }}>
                  <Text style={styles.tableLabels}>Brand</Text>
                  <Text style={styles.tableValues}>
                    {productDetails?.product_details?.product_brand}
                  </Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableLabels}>Weight</Text>
                  <Text style={styles.tableValues}>
                    {productDetails?.product_details?.product_weight}
                  </Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableLabels}>color</Text>
                  <Text style={styles.tableValues}>
                    {productDetails?.product_details?.product_color}
                  </Text>
                </View>

                <View style={styles.tableRow}>
                  <Text style={styles.tableLabels}>dimension</Text>
                  <Text style={styles.tableValues}>
                    {productDetails?.product_details?.product_dimension}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.specificationHeadingText}>
                Additional Specifications
              </Text>
              <View style={{ padding: 10 }}>
                {productDetails?.product_details?.additional_specification &&
                  productDetails?.product_details?.additional_specification.map(
                    (item, index) => {
                      const [key, value] = Object.entries(item)[0];

                      if (index > 3) {
                        if (extraSpecs) {
                          extraSpecs = [...extraSpecs, { [key]: value }];
                        } else {
                          extraSpecs = [{ [key]: value }];
                        }
                        return;
                      }
                      return (
                        <View style={styles.tableRow} key={index}>
                          <Text style={styles.tableLabels}>{key}</Text>
                          <Text style={styles.tableValues}>{value}</Text>
                        </View>
                      );
                    }
                  )}

                {extraSpecsVisibility &&
                  extraSpecs.map((item, index) => {
                    const [key, value] = Object.entries(item)[0];
                    return (
                      <View style={styles.tableRow} key={index}>
                        <Text style={styles.tableLabels}>{key}</Text>
                        <Text style={styles.tableValues}>{value}</Text>
                      </View>
                    );
                  })}

                <TouchableOpacity
                  style={{ alignSelf: "center", marginTop: 5 }}
                  onPress={() => setExtraSpecsVisibility(!extraSpecsVisibility)}
                >
                  {extraSpecsVisibility ? (
                    <FontAwesome name="chevron-up" size={16} color="#757575" />
                  ) : (
                    <FontAwesome
                      name="chevron-down"
                      size={16}
                      color="#757575"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.reviewContainer}>
            <Text
              style={[styles.specificationHeadingText, { color: "#5d61f9" }]}
            >
              Customer's say
            </Text>
            {/* map here  */}
            {productDetails &&
              productDetails?.product_ratings.map((review) => {
                return (
                  <ReviewCard
                    key={review.product_rating_id}
                    text={review.product_review}
                    rating={review.product_rating}
                    customer={review.customer_id}
                    date={review.updated_at}
                  />
                );
              })}
          </View>
        </ScrollView>
      </View>

      {/* Modals and Bottom Nav */}

      <Pressable
        style={({ pressed }) => [
          styles.floatingButton,
          pressed && styles.floatingButtonPressed,
        ]}
        onPress={() => {
          AddToCart(selectedProductId);
        }}
      >
        <Text style={styles.floatingButtonText}>Add to Cart</Text>
      </Pressable>
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
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  rootContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 120,
    flexGrow: 1,
  },
  heroContainer: {
    alignItems: "center",
    // backgroundColor: "pink",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "stretch",
    marginVertical: 10,
  },
  productTitle: {
    color: "#7B1E1E",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    marginVertical: 5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  totalRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "",
    borderRadius: 50,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 25,
  },
  totalReviewText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5d61f9",
  },
  OffersButton: {
    backgroundColor: "black",
    width: "90%",
    height: 40,
    justifyContent: "center",
    marginTop: 10,
  },
  specificationsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  descriptionContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  specificationHeadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  specificationText: {
    fontSize: 14,
    color: "#333",
  },
  tableLabels: {
    color: "#6E6E6E",
    flex: 1,
  },
  tableValues: {
    color: "#000",
    flex: 1,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  reviewContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: "95%",
    marginLeft: "2%",
  },
  floatingButton: {
    position: "absolute",
    bottom: 90,
    left: 20,
    right: 20,
    backgroundColor: "#FFBF39",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    opacity: 0.9,
  },

  floatingButtonPressed: {
    backgroundColor: "#E6A800",
  },

  floatingButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetails;
