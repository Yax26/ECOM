import { View, StyleSheet, Text } from "react-native";
import StarRating from "../SearchedProducts/StarRating";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function ReviewCard({ text, rating, customer, date }) {
  return (
    <View style={styles.individualReviewCard}>
      <View style={styles.userDetailsContainer}>
        <FontAwesome name="user" size={20} />
        <Text style={styles.specificationHeadingText}> {customer}</Text>
      </View>
      <StarRating rating={rating} />
      <Text style={[{ marginVertical: 5, fontWeight: "light" }]}>
        Reviewed on {date}
      </Text>

      <Text style={styles.specificationText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  individualReviewCard: {
    flex: 1,
    padding: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    margin: 5,
  },
  userDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
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
});

export default ReviewCard;
