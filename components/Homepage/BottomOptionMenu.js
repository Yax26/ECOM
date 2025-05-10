import { StyleSheet, View, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

function BottomOptionMenu({ setMenuVisibility, onPress, setScreen }) {
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
      <TouchableOpacity onPress={() => onPress("shopping-cart")}>
        <Feather name="shopping-cart" size={24} />
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
    // optional shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // optional elevation for Android
    elevation: 10,
  },
});
