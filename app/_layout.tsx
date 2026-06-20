import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import "../global.css";
export default function RootLayout() {
  return (
    <SafeAreaView>
      <View className="flex-1 bg-white p-4">
        <Stack />
      </View>
    </SafeAreaView>
  );
}
