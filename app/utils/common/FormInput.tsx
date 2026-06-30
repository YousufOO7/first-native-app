import { Text, TextInput, View } from "react-native";

interface FormInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
  secureTextEntry?: boolean;
  textContentType?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export default function FormInput({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  textContentType,
  autoCapitalize = "none",
}: FormInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-base font-medium text-gray-700">
          {label}
        </Text>
      )}

      <TextInput
        className={`border rounded-lg px-4 py-3 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        autoCapitalize={autoCapitalize}
      />

      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}