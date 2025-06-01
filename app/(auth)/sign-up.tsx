
import {ActivityIndicator, Text, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {useAuthStore} from "@/zustand/auth-store";
import MyToast from "@/utils/MyToast";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");


  const {signUp, loading: submitting} = useAuthStore();

  const handleSignUp = async () => {
    if (!email || !password || !adminPassword) return MyToast("info", "Please enter all the fields");
    const res = await signUp(email, password, adminPassword);
    if (res) {
      router.replace("/(tabs)/expense");
    }
  };

  return (
    <SafeAreaView className="bg-beige flex-1 w-full items-center px-6 justify-center">
      <Text className="text-3xl font-bold text-dark_slate mb-8">Create Account</Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full bg-soft_white p-4 rounded-[10px] text-dark_slate"
        placeholderTextColor="#999"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        className="bg-soft_white w-full rounded-[10px] p-4 text-dark_slate my-4"
        placeholderTextColor="#999"
      />

      <TextInput
        value={adminPassword}
        onChangeText={setAdminPassword}
        placeholder="Enter admin password"
        secureTextEntry
        className="bg-soft_white w-full rounded-[10px] p-4 text-dark_slate mb-5"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        className="bg-blue w-full p-4 rounded-[10px] items-center mb-5" onPress={handleSignUp}
        disabled={submitting}>
        {submitting ? (
          <ActivityIndicator color="#fff"/>
        ) : (
          <Text className="text-white font-bold">Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
        <Text className="text-sm mt-2.5 text-blue">Already have an account? Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}