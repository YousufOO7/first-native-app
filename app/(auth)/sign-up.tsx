import { useAuth, useSignUp } from '@clerk/expo';
import FormInput from 'app/utils/common/FormInput';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import OTPForm from './otp-form';

export default function SignUp() {
  const { signUp, fetchStatus, errors } = useSignUp();
  const { isSignedIn } = useAuth();
  const isLoading = fetchStatus === 'fetching';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  if (signUp.status === 'complete' || isSignedIn) {
    return null;
  }


  const onSignUpPress = async () => {
  const {error} = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    })

    if (error) {
      alert(`Error: ${error.message}`);
    }

    if(!error) await signUp.verifications.sendEmailCode();
  }

  if(
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center bg-white">
       <OTPForm />
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled">
      <View className="flex-1 justify-center bg-white px-4">
        <Text className="text-3xl font-bold">SignUp</Text>
        <Text className="mt-4 text-xl font-semibold text-gray-700">Create your account</Text>
        <Text className="mt-1 text-lg font-semibold text-gray-700">
          Find your dream home today!
        </Text>

        {/* input fields names */}
        <View className="my-4 flex-row gap-3">
          <FormInput
            label="First Name"
            placeholder="Enter first name"
            value={firstName}
            onChangeText={setFirstName}
            textContentType="givenName"
            autoCapitalize="words"
          />
          <FormInput
            label="Last Name"
            placeholder="Enter last name"
            value={lastName}
            onChangeText={setLastName}
            textContentType="familyName"
            autoCapitalize="words"
          />
        </View>

        {/* input fields email and password */}
        <View>
          <FormInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
          {errors.fields.emailAddress && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.fields.emailAddress.message}
            </Text>
          )}
          <FormInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {errors.fields.password && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.fields.password.message}
            </Text>
          )}

          <TouchableOpacity
            className="mt-4 rounded-lg bg-blue-500 py-3"
            onPress={onSignUpPress}
          >
            <Text className="text-center text-lg font-semibold text-white">
              {isLoading ? <ActivityIndicator color="white" /> : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View className="mt-4 flex-row justify-center">
            <Text className="text-gray-700">Already have an account? </Text>
            <Link href="/sign-in">
              <Text className="font-semibold text-blue-500">Sign In</Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
