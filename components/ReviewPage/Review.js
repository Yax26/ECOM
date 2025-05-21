import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import server from "../../constants/server.js";
import StarRating from "../SearchedProducts/StarRating";
import BottomOptionMenu from "../Homepage/BottomOptionMenu";

import { useEffect, useState } from "react";
import ReviewCard from "../ProductDetails/ReviewCard";

function Review({
  setScreen,
  selectedProductId,
  setMenuVisibility,
  cartIconNumber,
}) {
  const [review, setProductReview] = useState("");

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
          setProductReview(json.data);
        }
      } catch (e) {}
    };

    fetchReview();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={styles.reviewHeadingContainer}>
          <Pressable>
            <Feather
              name="x"
              size={28}
              color="black"
              onPress={() => setScreen("product_details")}
              marginLeft="80%"
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
              <View key={`star-${star}`} style={styles.ratingBar}>
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

        <View style={styles.reviewCard}>
          {review &&
            review?.product_ratings.map((review) => {
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

          <Text style={styles.helpfulText}>1 person found it helpful</Text>
          <TouchableOpacity style={styles.helpfulButton}>
            <Text style={styles.helpfulButtonText}>Helpful</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.floatingButton,
          pressed && styles.floatingButtonPressed,
        ]}
        onPress={() => setScreen("addreview")}
      >
        <Text style={styles.floatingButtonText}>ADD A REVIEW</Text>
      </Pressable>

      <BottomOptionMenu
        setMenuVisibility={setMenuVisibility}
        setScreen={setScreen}
        cartIconNumber={cartIconNumber}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textHeading: {
    justifyContent: "center",
    fontWeight: "600",
    alignItems: "center",
    fontSize: 22,
  },
  reviewHeadingContainer: {
    marginTop: 80,
    alignItems: "center",
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
  totalReviews: {
    marginTop: 10,
    fontSize: 10,
    textAlign: "center",
    color: "#aaa",
  },
  reviewCard: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 12,
    margin: 16,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  userInformation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    fontWeight: "bold",
  },
  date: {
    color: "#888",
    fontSize: 12,
  },
  ratingBox: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingBoxText: {
    marginLeft: 4,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  reviewText: {
    marginBottom: 8,
  },
  helpfulText: {
    color: "#aaa",
    fontSize: 12,
  },
  helpfulButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  helpfulButtonText: {
    fontWeight: "bold",
  },

  floatingButton: {
    position: "absolute",
    top: 550,
    left: "45%",
    width: "50%",
    backgroundColor: "#11110f",
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
    backgroundColor: "#6c685e",
  },
  floatingButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default Review;
