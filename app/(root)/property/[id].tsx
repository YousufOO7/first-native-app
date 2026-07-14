/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSavedProperty } from "hooks/useSavedProperty";
import { useSupabase } from "hooks/useSupabase";
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useUserStore } from "store/userStore";
import { Property } from "app/utils/types/property";
import { PropertyDetails } from "components/pages/PropertyDetails";
import { ImageCarousel } from "components/pages/ImageCarousel";

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const isAdmin = useUserStore((state) => state.isAdmin);

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const { isSaved, saveLoading, toggleSave } = useSavedProperty(id ?? "");
  const authSupabase = useSupabase();

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();
    setProperty(data);
    setLoading(false);
  };

  const handleDelete = () => {
    Alert.alert("Delete Property", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await authSupabase.from("properties").delete().eq("id", id);
          router.replace("/(root)/(tabs)");
        },
      },
    ]);
  };

  const handleMarkSold = () => {
    Alert.alert("Mark as Sold", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Mark Sold",
        onPress: async () => {
          await authSupabase
            .from("properties")
            .update({ is_sold: true })
            .eq("id", id);
          setProperty((prev) => (prev ? { ...prev, is_sold: true } : prev));
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!property) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Property not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel Component */}
        <ImageCarousel
          images={property.images}
          isSaved={isSaved}
          saveLoading={saveLoading}
          onToggleSave={toggleSave}
          onBack={() => router.back()}
          isSold={property.is_sold}
        />

        {/* Property Details Component */}
        <PropertyDetails
          property={property}
          isAdmin={isAdmin}
          onDelete={handleDelete}
          onMarkSold={handleMarkSold}
        />
      </ScrollView>
    </View>
  );
}