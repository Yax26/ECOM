import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import ProductCard from "../SearchedProducts/ProductCard";
import BottomOptionMenu from "../Homepage/BottomOptionMenu";

function ShoppingCart() {
  return (
    <>
      <ScrollView style={styles.ProductCard}>
        <View style={styles.cartContainer}>
          <View style={styles.ProductContainer}>
            <Image style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>Headphones</Text>
              <Text style={styles.price}>$400</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>1</Text>
              <TouchableOpacity>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.paymentDetails}>
            <Text style={styles.paymentTitle}>Payment Details</Text>
            <View style={styles.paymentinfo}>
              <Text>Sub Total</Text>
              <Text>10</Text>
            </View>
            <View style={styles.paymentinfo}>
              <Text>Delivery Fee</Text>
              <Text>10</Text>
            </View>
            <View style={styles.paymentinfo}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>20</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomOptionMenu />
    </>
  );
}

export default ShoppingCart;
const styles = StyleSheet.create({
  ProductCard: {
    marginTop: 100,
    marginHorizontal: 10,
    marginBottom: 100,
    borderWidth: 2,
    borderRadius: 30,
  },

  cartContainer: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
  },
  ProductContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 5,
    height: 120,
  },
  paymentDetails: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 5,
    height: 175,
    padding: 15,
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  price: {
    color: "#555",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: "#FFD700",
  },
  quantityText: {
    marginHorizontal: 5,
  },
  paymentTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  productTitle: {
    margin: 10,
    marginLeft: 120,
  },
  paymentinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalLabel: {
    fontWeight: "bold",
  },
  totalValue: {
    fontWeight: "bold",
    color: "#000",
  },
  checkoutButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  checkoutText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});
