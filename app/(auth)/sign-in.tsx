import { useAuth, useSignIn } from '@clerk/expo';
import FormInput from 'app/utils/common/FormInput';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignIn() {
  const { signIn, fetchStatus, errors } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const isLoading = fetchStatus === 'fetching';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isSignedIn) {
    return null;
  }

  const onSignInPress = async () => {
  const {error} = await signIn.password({
      emailAddress: email,
      password,
    })

    if (error) {
      alert(`Error: ${error.message}`);
    }

    if(signIn.status === "complete") {
      await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if(session?.currentTask){
              console.log("Current Task:", session.currentTask);
              return;
            }
            const url = decorateUrl('/');
            router.replace(url as any);
          },
        });
    }

    else{
      console.error("sign-in attempt not complete", signIn)
    }

    // if(!error) await signUp.verifications.sendEmailCode();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      className="bg-white"
    >
      <View className="flex-1 justify-center bg-white px-4">
        <Text className="text-3xl font-bold">Sign In</Text>

        <Text className="mt-4 text-xl font-semibold text-gray-700">
          Welcome Back
        </Text>

        <Text className="mt-1 text-lg text-gray-700">
          Sign in to continue.
        </Text>

        <View className="mt-6">
          <FormInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
          />

          {errors.fields.identifier && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.fields.identifier.message}
            </Text>
          )}

          <FormInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {errors.fields.password && (
            <Text className="mt-1 text-sm text-red-500">
              {errors.fields.password.message}
            </Text>
          )}

          <TouchableOpacity
            className="mt-4 rounded-lg bg-blue-500 py-3"
            onPress={onSignInPress}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-lg font-semibold text-white">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <View className="mt-4 flex-row justify-center">
            <Text className="text-gray-700">
              Don&apos;t have an account?{' '}
            </Text>

            <Link href="/sign-up">
              <Text className="font-semibold text-blue-500">
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}