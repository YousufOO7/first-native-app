import { useAuth, useSignUp } from '@clerk/expo';
import FormInput from 'app/utils/common/FormInput';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

export default function OTPForm() {
  const { signUp, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const isLoading = fetchStatus === 'fetching';
  console.log(isLoading);
  const [isResending, setIsResending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState('');

  if (signUp.status === 'complete' || isSignedIn) {
    return null;
  }

  const onVerifyPress = async () => {
    if (!otp) {
      alert('Please enter the OTP code');
      return;
    }

    try {
        setIsVerifying(true);
      await signUp.verifications.verifyEmailCode({ code: otp });

      if (signUp.status === 'complete') {
        await signUp.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl('/');
            router.replace(url as any);
          },
        });
      } else {
        alert('Verification failed. Please try again.');
      }
    } catch (err: any) {
      alert(`Error: ${err.message || 'Something went wrong'}`);
    }
  };

  const onResendPress = async () => {
    try {
      setIsResending(true);
      await signUp.verifications.sendEmailCode();
      alert('New OTP has been sent to your email');
    } catch (err: any) {
      alert(`Error: ${err.message || 'Failed to resend OTP'}`);
    }
  };

  return (
    <View className="flex-1 justify-center bg-white px-4">
      <Text className="text-3xl font-bold">Verify Email</Text>
      <Text className="mt-4 text-xl font-semibold text-gray-700">
        Enter the code sent to your email
      </Text>

      <View className="my-6">
        <FormInput
          label="Verification Code"
          placeholder="Enter 6-digit code"
          value={otp}
          onChangeText={setOtp}
          textContentType="oneTimeCode"
          keyboardType="number-pad"
          //   maxLength={6}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        className="mt-4 rounded-lg bg-blue-500 py-2"
        onPress={onVerifyPress}
        disabled={isVerifying || !otp}>
        <Text className="text-center text-lg font-semibold text-white">
          {isVerifying ? <ActivityIndicator color="white" /> : 'Verify Email'}
        </Text>
      </TouchableOpacity>

      {/* Resend OTP */}
      <TouchableOpacity
        className="mt-4 rounded-lg bg-gray-200 py-2"
        onPress={onResendPress}
        disabled={isResending}>
        <Text className="text-center text-lg font-semibold text-gray-700">
          {isResending ? <ActivityIndicator color="gray" /> : 'Resend OTP'}
        </Text>
      </TouchableOpacity>

      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-600">Wrong email? </Text>
        <Text onPress={() => router.back()} className="font-semibold text-blue-500">
          Go back
        </Text>
      </View>
    </View>
  );
}
