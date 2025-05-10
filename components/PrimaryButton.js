import { View, Text, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ children, onPress, additional_style, font_style }) {
  function pressHandler() {
    onPress();
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => (pressed ? styles.pressed : "")}
    >
      <View style={[styles.container, additional_style]}>
        <Text style={[styles.text, font_style]}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffbf39",
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 35,
    borderRadius: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
