import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomOptionMenu from "../components/Homepage/BottomOptionMenu";
import server from "../constants/server";
import { useEffect, useState } from "react";

function ShoppingCart({
  setMenuVisibility,
  setScreen,
  selectedProductId,
  setSelectedProductId,
  cartIconNumber,
  setCartIconNumber,
}) {
  const [cartData, setCartData] = useState(null);
  useEffect(() => {
    const getCartDetails = async () => {
      const token = await AsyncStorage.getItem("auth_token");
      try {
        const res = await fetch(`${server.host}/cart/management/`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (json?.status?.code === 200) {
          setCartData(json.data);
        } else {
          Alert.alert("Error", json?.status?.message, [
            { text: "okay!", style: "destructive", onPress: resetHandler },
          ]);
        }
      } catch (err) {
        Alert.alert("Network error", err.message);
      }
    };
    getCartDetails();
  }, []);

  return (
    <>
      <ScrollView style={styles.ProductCard}>
        <View style={styles.cartContainer}>
          {cartData &&
            cartData?.products.map((product) => {
              return (
                <View style={styles.ProductContainer} key={product.product_id}>
                  <TouchableOpacity
                    onPress={() => {
                      setScreen("product_details");
                      setSelectedProductId(product.product_id);
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${server.host}/Media/${product.product_image}`,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={styles.info}>
                    <Text style={styles.name}>{product.product_name}</Text>
                    <Text style={styles.price}>{product.product_price}</Text>
                  </View>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      {product.product_quantity}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}

          <View style={styles.paymentDetails}>
            <Text style={styles.paymentTitle}>Payment Details</Text>
            <View style={styles.paymentinfo}>
              <Text>Sub Total</Text>
              <Text>${cartData?.sub_total}</Text>
            </View>
            <View style={styles.paymentinfo}>
              <Text>Delivery Fee</Text>
              <Text>${cartData?.delivery_fees}</Text>
            </View>
            <View style={styles.paymentinfo}>
              <Text>Tax</Text>
              <Text>${cartData?.tax}</Text>
            </View>
            <View style={styles.paymentinfo}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${cartData?.total}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>CHECKOUT</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomOptionMenu
        setMenuVisibility={setMenuVisibility}
        setScreen={setScreen}
        cartIconNumber={cartIconNumber}
      />
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
    backgroundColor: "#f9f9f9",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
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
    height: "auto",
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
    width: 70,
    height: 70,
    margin: 20,
    borderRadius: 10,
  },
  info: {
    marginLeft: 100,
    marginTop: -70,
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
    marginLeft: "65%",
    marginBottom: 20,
    gap: 20,
  },
  quantityButton: {
    fontSize: 20,
    // padding: 10,
    textAlign: "center",
    width: 25,
    height: 25,
    color: "white",
    fontWeight: "bold",

    borderRadius: 30,
    backgroundColor: "#FFD700",
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
