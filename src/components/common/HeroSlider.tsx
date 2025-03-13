import React, { useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";

const { width: screenWidth } = Dimensions.get("window");

const sliderData = [
  { id: "1", image: "https://picsum.photos/seed/pic1/600/400" },
  { id: "2", image: "https://picsum.photos/seed/pic2/600/400" },
  { id: "3", image: "https://picsum.photos/seed/pic3/600/400" },
];

const HeroSlider = () => {
  const carouselRef = useRef<Carousel<any>>(null);

  const renderItem = ({ item }: { item: { id: string; image: string } }) => {
    console.log("Rendering Item:", item);

    return (
      <View style={styles.slide}>
        <FastImage
          source={{ uri: item.image, priority: FastImage.priority.normal }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={sliderData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop
        autoplay
        autoplayInterval={3000}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  slide: {
    width: screenWidth,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default HeroSlider;
