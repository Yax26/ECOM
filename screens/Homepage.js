import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";

import server from "../constants/server.js";

import SearchContainer from "../components/Homepage/SearchContainer";
import FeatureGrid from "../components/Homepage/FeatureGrid";
import BottomOptionMenu from "../components/Homepage/BottomOptionMenu";
import MenuModal from "../components/common/MenuModal";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CATALOG_HEIGHT = SCREEN_HEIGHT * 0.4; // height of carousel

export default function Homepage({
  setScreen,
  searchedWord,
  setSearchedWord,
  setSearchedData,
  menuVisibility,
  setMenuVisibility,
  cartIconNumber,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [homepageData, setHomepageData] = useState("");
  const [visibility, setVisibility] = useState("home");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${server.host}/homepage/mobile/`);
        const json = await res.json();
        setHomepageData(json);
      } catch (e) {}
    };
    fetchProducts();
  }, []);

  const features = homepageData?.data?.features;

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <ImageBackground
      source={require("../assets/images/IMG_4472.jpg")}
      style={styles.homepageContainer}
      imageStyle={styles.backgroundImage}
    >
      <SearchContainer
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        setSearchedData={setSearchedData}
        setScreen={setScreen}
      />

      <View style={styles.catalogSection}>
        <Text style={styles.catalogTitle}>Top Deals</Text>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
          contentContainerStyle={styles.carouselContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {features?.map((item, idx) => (
            <View key={idx} style={styles.pageWrapper}>
              <FeatureGrid
                title={item.feature_title}
                imageKey={`${server.host}${item.feature_image1}`}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.dotsContainer}>
          {features?.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, idx === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <MenuModal
        visible={menuVisibility}
        setScreen={setScreen}
        onClose={() => setMenuVisibility(false)}
      />

      <BottomOptionMenu
        setMenuVisibility={setMenuVisibility}
        setScreen={setScreen}
        cartIconNumber={cartIconNumber}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  homepageContainer: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  catalogSection: {
    position: "absolute",
    bottom: 130,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  catalogTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  carouselContainer: {
    width: SCREEN_WIDTH,
    height: CATALOG_HEIGHT,
    marginBottom: -5, // bring dots closer to carousel
  },
  carouselContent: {
    alignItems: "flex-start",
  },
  pageWrapper: {
    width: SCREEN_WIDTH,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 17,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginRight: 8,
  },
  activeDot: {
    backgroundColor: "#000",
  },
});
