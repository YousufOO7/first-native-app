import { useAuth, useSignUp } from '@clerk/expo';
import FormInput from 'app/utils/common/FormInput';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text,  TouchableOpacity,  View } from 'react-native';

export default function SignUp() {
  const {signUp, fetchStatus} = useSignUp();
  const {isSignedIn} = useAuth();
  const router = useRouter();
  const isLoading = fetchStatus === "fetching";
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });


  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled">
      <View className="flex-1 bg-white px-4 justify-center">
        <Text className="text-3xl font-bold">SignUp</Text>
        <Text className="text-xl text-gray-700 mt-4 font-semibold">Create your account</Text>
        <Text className="text-lg text-gray-700 mt-1 font-semibold">Find your dream home today!</Text>

        {/* input fields names */}
        <View className="flex-row gap-3 my-4">
          <FormInput
            label="First Name"
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
            textContentType="givenName"
            autoCapitalize="words"
          />
          <FormInput
            label="Last Name"
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
            textContentType="familyName"
            autoCapitalize="words"
          />
        </View>

        {/* input fields email and password */}
          <FormInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          <FormInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry={true}
          />

          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-lg mt-4"
            // onPress={handleSignUp}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {
                isLoading ? <ActivityIndicator /> : "Sign Up"
              }
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-700">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
              <Text className="text-blue-500 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
}
