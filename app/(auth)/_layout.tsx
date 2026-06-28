// import { useAuth } from '@clerk/expo';
// import { Redirect, Stack } from 'expo-router';
// export default function AuthLayout() {

//     const { isLoaded, isSignedIn } = useAuth();

//     if(!isLoaded) {
//         return null;
//     }

//     if(!isSignedIn) {
//         return (
//             <Redirect href="/sign-in" />
//         );
//     }

//   return (
//       <Stack screenOptions={{ headerShown: false }}>
//       </Stack>
//   );
// }

import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}