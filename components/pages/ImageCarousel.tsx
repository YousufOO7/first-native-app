import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageModal from "react-native-image-modal";

const { width } = Dimensions.get("window");

interface ImageCarouselProps {
  images: string[];
  isSaved?: boolean;
  saveLoading?: boolean;
  onToggleSave?: () => void;
  onBack?: () => void;
  isSold?: boolean;
}

export function ImageCarousel({
  images,
  isSaved = false,
  saveLoading = false,
  onToggleSave,
  onBack,
  isSold = false,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View>
      <View style={{ opacity: isSold ? 0.5 : 1 }}>
        <FlatList
          data={images}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <ImageModal
              source={{ uri: item }}
              style={{
                width,
                height: 300,
              }}
              resizeMode="cover"
            />
          )}
        />
      </View>

      {/* Image count badge */}
      <View className="absolute bottom-3 right-4 bg-black/50 px-3 py-1 rounded-full">
        <Text className="text-white text-xs font-medium">
          {activeIndex + 1}/{images.length}
        </Text>
      </View>

      {/* Dot indicators */}
      {images.length > 1 && (
        <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-1">
          {images.map((_, i) => (
            <View
              key={i}
              className={`h-1.5 rounded-full ${
                i === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </View>
      )}

      {/* Back + Save buttons */}
      <View className="absolute top-0 left-0 right-0">
        <View className="flex-row items-center justify-between px-4 pt-2">
          <TouchableOpacity
            onPress={onBack}
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
            style={{ elevation: 3 }}
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onToggleSave}
            disabled={saveLoading}
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
            style={{ elevation: 3 }}
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={20}
              color={isSaved ? "#EF4444" : "#111827"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}