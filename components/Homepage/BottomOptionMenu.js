import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";

function BottomOptionMenu({
  setMenuVisibility,
  onPress,
  setScreen,
  cartIconNumber,
}) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => setMenuVisibility(true)}>
        <Feather name="menu" size={24} color="#ffbf39" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("home")}>
        <Feather name="home" size={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress("user")}>
        <Feather name="user" size={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("cart")}>
        <View style={{ position: "relative" }}>
          <Feather name="shopping-cart" size={24} />
          {cartIconNumber > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartIconNumber}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default BottomOptionMenu;

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
