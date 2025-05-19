import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import server from "../../constants/server.js";
import Feather from "react-native-vector-icons/Feather";
import { ProgressBar } from "react-native-paper";
import StarRating from "../SearchedProducts/StarRating";
import BottomOptionMenu from "../Homepage/BottomOptionMenu";
import { useEffect, useState } from "react";
function AddReview({
  setScreen,
  selectedProductId,
  setMenuVisibility,
  cartIconNumber,
}) {
  const [reviewImage, setReviewImage] = useState("");
  const [reviewText, setReviewText] = useState("");
  useEffect(() => {
    const fetchReview = async () => {
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
          setReviewImage(json.data);
        }
      } catch (e) {}
    };

    fetchReview();
  }, []);
  console.log();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.reviewHeadingContainer}>
          <Pressable>
            <Feather
              name="x"
              size={28}
              color="black"
              onPress={() => setScreen("product_details")}
              style={{ alignSelf: "flex-end", marginRight: 20 }}
            />
          </Pressable>
          <Text style={styles.textHeading}>All Reviews</Text>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.averageRatingContainer}>
            <Text style={styles.averageRating}>4</Text>
            <StarRating />
            <Text style={styles.totalReviews}>1800 Reviews</Text>
          </View>

          <View style={styles.ratingBarsContainer}>
            {[5, 4, 3, 2, 1].map((star) => (
              <View key={star} style={styles.ratingBar}>
                <Text style={styles.ratingNumber}>{star}</Text>
                <ProgressBar
                  width={170}
                  height={15}
                  progress={Math.random() * 0.9 + 0.1}
                  style={{ margin: 4 }}
                  color="#787272"
                  borderWidth={1}
                  marginLeft={20}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.writeReviewContainer}>
          <View style={styles.itemRow}>
            <Image
              source={{
                uri: `${server.host}${reviewImage?.product_details?.product_image}`,
              }}
              style={styles.productImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.ratingPrompt}>How was the item?</Text>
              <StarRating />
            </View>
          </View>

          <Text style={styles.reviewLabel}>Write a review</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What should other customers know?"
            placeholderTextColor="#999"
            multiline
            scrollEnabled={true}
            value={reviewText}
            onChangeText={setReviewText}
          />

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomOptionMenu
        setMenuVisibility={setMenuVisibility}
        setScreen={setScreen}
        cartIconNumber={cartIconNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textHeading: {
    fontWeight: "600",
    fontSize: 22,
    textAlign: "center",
    marginTop: 10,
  },
  reviewHeadingContainer: {
    marginTop: 80,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 30,
  },
  averageRating: {
    fontSize: 100,
    fontWeight: "bold",
  },
  averageRatingContainer: {
    marginTop: -15,
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    marginLeft: "15%",
    marginTop: "5%",
  },
  ratingBarsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  ratingNumber: {
    width: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  totalReviews: {
    marginTop: 10,
    fontSize: 10,
    textAlign: "center",
    color: "#aaa",
  },
  writeReviewContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 20,
    borderRadius: 8,
    padding: 15,
    elevation: 3,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    borderRadius: 6,
  },
  itemDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
  ratingPrompt: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  reviewLabel: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  textInput: {
    minHeight: 100,
    maxHeight: 200,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 24,
  },
  submitText: {
    fontWeight: "bold",
    color: "#000",
  },
  floatingButton: {
    backgroundColor: "#11110f",
    paddingVertical: 14,
    marginHorizontal: 20,
    width: "40%",
    marginLeft: "58%",
    marginTop: 20,
    borderRadius: 30,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    opacity: 0.9,
  },
  floatingButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddReview;
