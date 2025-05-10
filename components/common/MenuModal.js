import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

export default function MenuModal({ visible, setScreen, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header with user greeting and close button */}
        <View style={styles.header}>
          <View style={styles.userContainer}>
            <Feather
              name="user"
              size={24}
              color="#fff"
              style={styles.userIcon}
            />
            <Text style={styles.greeting}>Hello, </Text>
            <TouchableOpacity onPress={() => setScreen("login")}>
              <Text style={[styles.greeting, { color: "#ffbf39" }]}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Trending Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Trending <Text style={styles.fire}>🔥</Text>
            </Text>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>New Arrivals</Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Best Sellers</Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Your Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Account</Text>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Profile</Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Orders</Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Help</Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>About us</Text>
              <Feather name="chevron-right" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Sign Out Button */}
        <View style={styles.footer}>
          <LinearGradient
            colors={["#ffbf39", "#FF8A65"]}
            style={styles.signOutButton}
          >
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIcon: {
    marginRight: 8,
  },
  greeting: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  fire: {
    fontSize: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
  footer: {
    padding: 16,
  },
  signOutButton: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  signOutText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
