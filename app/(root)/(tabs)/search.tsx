/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from '@expo/vector-icons';
import { Property } from 'app/utils/types/property';
import { FilterChips } from 'components/filters/FilterChips';
import FilterModal from 'components/modals/FilterModal';
import PropertyCard from 'components/pages/PropertyCard';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from 'lib/supabase';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFilterStore } from 'store/filterStore';

export default function SearchScreen() {
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { openFilters } = useLocalSearchParams<{ openFilters?: string }>();

  useEffect(() => {
    if (openFilters === 'true') {
      setShowFilter(true);
    }
  }, [openFilters]);

  const {
    bedrooms,
    maxPrice,
    minPrice,
    search,
    type,
    setSearch,
  } = useFilterStore();

  const activeFilterCount = [
    type !== null,
    bedrooms !== null,
    minPrice !== null,
    maxPrice !== null,
  ].filter(Boolean).length;

  useEffect(() => {
    fetchResults();
  }, [search, type, bedrooms, minPrice, maxPrice]);

  const fetchResults = async () => {
    setLoading(true);

    let query = supabase.from('properties').select('*');

    if (search) {
      query = query.or(`title.ilike.%${search}%,city.ilike.%${search}%`);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (bedrooms) {
      query = query.eq('bedrooms', bedrooms);
    }

    if (minPrice) {
      query = query.gte('price', minPrice);
    }

    if (maxPrice) {
      query = query.lte('price', maxPrice);
    }

    const { data } = await query.order('created_at', { ascending: false });

    setResults(data ?? []);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 pb-3 pt-4">
        <Text className="mb-4 text-2xl font-bold text-gray-900">Find Property</Text>

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
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setShowFilter(true)}
            className={`items-center justify-center rounded-2xl  ${activeFilterCount > 0 ? 'bg-blue-600' : 'bg-white'}`}>
            <Ionicons
              name="options-outline"
              size={24}
              color={activeFilterCount > 0 ? '#fff' : '#374151'}
            />
            {activeFilterCount > 0 && (
              <View className="absolute -right-1 -top-1 h-6 w-6 items-center justify-center rounded-full bg-red-600">
                <Text className="text-xs font-bold text-white">{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* filter clip */}
       <FilterChips />
      </View>
      {/* result */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PropertyCard property={item} />}
        ListHeaderComponent={
          <Text className="mb-4 text-sm text-gray-400">
            {loading ? 'Searching...' : `${results.length} properties found`}
          </Text>
        }
        ListEmptyComponent={
          !loading ? (
            <View className="items-center py-20">
              <Ionicons name="search-outline" size={48} color="#D1D5DB" />
              <Text className="mt-4 text-base text-gray-400">No properties found</Text>
              <Text className="mt-1 text-sm text-gray-300">
                Try a different search or adjust filters
              </Text>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#2563EB" className="py-20" />
          )
        }
      />
      {/* filter modal */}
      <FilterModal visible={showFilter} onClose={() => setShowFilter(false)} />
    </SafeAreaView>
  );
}
