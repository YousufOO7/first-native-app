import { Ionicons } from '@expo/vector-icons';
import { Property } from 'app/utils/types/property';
import { useRouter } from 'expo-router';
import { formatPrice } from 'lib/utils';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function FeaturedCart({ property }: { property: Property }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      className={`mr-2 w-72 overflow-hidden rounded-3xl bg-white opacity=${property?.is_sold ? '50' : '100'}`}
      onPress={() => router.push(`/root/property/${property?.id}`)}>
      <Image source={{ uri: property?.images[0] || "https://via.placeholder.com/150" }} className="h-44 w-full" resizeMode="cover" />

      <View className="absolute left-3 top-3  rounded-3xl bg-white/90 px-3 py-1">
        <Text className="p-1 font-bold capitalize">{property?.type}</Text>
      </View>

      {property?.is_sold && (
        <View className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1">
          <Text className="p-1 font-semibold capitalize text-white">Sold</Text>
        </View>
      )}

        {/* Info */}
      <View className="p-4">
        <Text
          className="text-base font-bold text-gray-800 mb-1"
          numberOfLines={1}
        >
          {property?.title}
        </Text>

        <View className="flex-row items-center gap-1 mb-3">
          <Ionicons name="location-outline" size={13} color="#6B7280" />
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {property?.address}, {property?.city}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-blue-600 font-bold text-base">
            {formatPrice(property?.price)}
          </Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="bed-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">{property?.bedrooms}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="water-outline" size={13} color="#6B7280" />
              <Text className="text-xs text-gray-500">
                {property?.bathrooms}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
