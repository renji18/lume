
import {ActivityIndicator, Text, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {useAuthStore} from "@/zustand/auth-store";
import {router} from "expo-router";
import MyToast from "@/utils/MyToast";
import {SafeAreaView} from "react-native-safe-area-context";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {signIn, loading: submitting} = useAuthStore();

  const handleSignIn = async () => {
    if (!email || !password) return MyToast("info", "Please enter all the fields");
    const res = await signIn(email, password);
    if (res) {
      router.replace("/(tabs)/expense");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-beige w-full justify-center items-center px-6">
      <Text className="text-3xl font-bold text-dark_slate mb-8">Welcome Back</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full bg-soft_white p-4 rounded-[10px] text-dark_slate"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full bg-soft_white p-4 rounded-[10px] my-4 text-dark_slate"
      />

      <TouchableOpacity
        className="bg-blue w-full py-4 rounded-[10px] items-center mb-5" onPress={handleSignIn}
        disabled={submitting}>
        {submitting ? (
          <ActivityIndicator color="#fff"/>
        ) : (
          <Text className="text-white font-bold">Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
        <Text className="text-sm mt-2.5 text-blue">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}