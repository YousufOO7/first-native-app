import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Property } from 'app/utils/types/property';
import FeaturedCart from 'components/pages/FeaturedCart';
import PropertyCard from 'components/pages/PropertyCard';
import { useFocusEffect, useRouter } from 'expo-router';
import { supabase } from 'lib/supabase';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user } = useUser();
  const router = useRouter();

  const [featured, setFeatured] = useState<Property[]>([]);
  const [recommended, setRecommended] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(featured, recommended);

  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, [])
  );

  const fetchProperties = async () => {
    setLoading(true);

    const { data: featuredData } = await supabase
      .from('properties')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    const { data: recommendedData } = await supabase
      .from('properties')
      .select('*')
      .eq('is_featured', false)
      .order('created_at', { ascending: false });

    setFeatured(featuredData ?? []);
    setRecommended(recommendedData ?? []);
    setLoading(false);
  };

  return (
    <SafeAreaProvider className="flex-1 bg-gray-50">
      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pb-5 pt-4">
              <Text className="text-lg font-bold">Native App</Text>
              <View className="items-end">
                <Text className="text-xs text-gray-500">Good morning 👋</Text>
                <Text className="text-base font-bold text-gray-900">
                  {user?.firstName ?? 'User'}
                </Text>
              </View>
            </View>

            {/* Search Bar */}
            <TouchableOpacity
              onPress={() => router.push('/(root)/(tabs)/search')}
              className="mx-5 mb-6 flex-row items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <Ionicons name="search-outline" size={18} color="#9CA3AF" />
              <Text className="flex-1 text-sm text-gray-400">Search properties, cities...</Text>
              <TouchableOpacity
                onPress={() => router.push('/(root)/(tabs)/search?openFilters=true')}
                className="h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
                <Ionicons name="options-outline" size={15} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Featured Section */}
            <View className="mb-6 px-5">
              <Text className="mb-6 text-lg font-bold">Featured</Text>

              {loading ? (
                <ActivityIndicator size="small" color="#0000ff" className="py-10" />
              ) : (
                <FlatList
                  data={featured}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => <FeaturedCart property={item} />}></FlatList>
              )}
            </View>

            {/* Recommended Header */}
            <Text className="mb-4 px-5 text-lg font-bold text-gray-900">Recommended</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="px-5">
            <PropertyCard property={item} />
          </View>
        )}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center py-10">
              <Text className="text-gray-400">No properties found</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaProvider>
  );
}
