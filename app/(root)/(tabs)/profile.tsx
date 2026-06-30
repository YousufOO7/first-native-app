import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const {signOut} = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    }
    catch (error) {
      console.error("Error signing out:", error);
    }
  }
  return (
    <View >
      <Text className="text-3xl">ProfileScreen</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}