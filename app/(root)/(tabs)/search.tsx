import { Ionicons } from "@expo/vector-icons";
import { Property } from "app/utils/types/property";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFilterStore } from "store/filterStore";

export default function SearchScreen() {
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const {openFilters} = useLocalSearchParams<{openFilters?: string}>();

  useEffect(() => {
    if (openFilters === "true") {
      setShowFilter(true);
    }
  }, [openFilters]);

  const {bedrooms, maxPrice,minPrice,search,type,setBedrooms,setMaxPrice,setMinPrice,setSearch,setType} = useFilterStore();

  const activeFilterCount = [
    type !== null,
    bedrooms !==null,
    minPrice !== null,
    maxPrice !== null
  ].filter(Boolean).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
     <View className="px-5 pb-3 pt-4">
      <Text className="text-2xl font-bold text-gray-900 mb-4">Find Property</Text>

      {/* search bar */}
      <View className="flex-row items-center gap-3">
        <View className="flex-1 flex-row items-center gap-3 rounded-3xl bg-white px-4">
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search by title or city..."
            value={search}
            onChangeText={setSearch}
            className="flex-1 py-3 text-gray-700"
            autoCapitalize="none"
          />
          {/* show X icon if search is not empty */}
          {
            search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )
          }
        </View>

        <TouchableOpacity
        onPress={() => setShowFilter(true)}
        className={`rounded-2xl items-center justify-center  ${activeFilterCount > 0 ? "bg-blue-600" : "bg-white"}`}
        >
          <Ionicons name="options-outline" size={24} color={activeFilterCount > 0 ? "#fff" : "#374151"} />
          {activeFilterCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-600 rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-white text-xs font-bold">{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
   </SafeAreaView>
  );
}