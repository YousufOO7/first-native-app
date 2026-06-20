import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View >
      <Text className="text-3xl">Hello World</Text>

      <TextInput placeholder="Type something here..." className="border p-2 mt-4" />

     <View className="flex-row justify-between">
       <TouchableOpacity
      onPress={() => alert("Button Pressed!")}
       className="bg-blue-500 p-4 mt-4 rounded">
        <Text className="text-white text-center">Press Me 1</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
}