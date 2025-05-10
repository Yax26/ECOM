import { View, Text, Pressable, StyleSheet } from "react-native";

function BannerButton({ children, onPress }) {
  function pressHandler() {
    onPress();
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => (pressed ? styles.pressed : "")}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffbf39",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    height: 35,
    borderRadius: 9,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default BannerButton;
