import {useFonts} from "expo-font"
import {Stack} from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import {StatusBar} from "expo-status-bar"
import {useEffect} from "react"
import Toast from "react-native-toast-message"
import "react-native-reanimated"
import {GestureHandlerRootView} from "react-native-gesture-handler"
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import "../global.css"
import {useAuthStore} from "@/zustand/auth-store";
import {useTransactionStore} from "@/zustand/transaction-store";
import {useSubscriptionStore} from "@/zustand/subscription-store";
import {useAnalyticsStore} from "@/zustand/analytics-store";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    gb: require("../assets/fonts/SourGummy-Bold.ttf"),
    gbi: require("../assets/fonts/SourGummy-BoldItalic.ttf"),
    geb: require("../assets/fonts/SourGummy-ExtraBold.ttf"),
    gebi: require("../assets/fonts/SourGummy-ExtraBoldItalic.ttf"),
    gel: require("../assets/fonts/SourGummy-ExtraLight.ttf"),
    geli: require("../assets/fonts/SourGummy-ExtraLightItalic.ttf"),
    gl: require("../assets/fonts/SourGummy-Light.ttf"),
    gli: require("../assets/fonts/SourGummy-LightItalic.ttf"),
    gm: require("../assets/fonts/SourGummy-Medium.ttf"),
    gmi: require("../assets/fonts/SourGummy-MediumItalic.ttf"),
    gsb: require("../assets/fonts/SourGummy-SemiBold.ttf"),
    gsbi: require("../assets/fonts/SourGummy-SemiBoldItalic.ttf"),
    gt: require("../assets/fonts/SourGummy-Thin.ttf"),
    gti: require("../assets/fonts/SourGummy-ThinItalic.ttf"),
    gi: require("../assets/fonts/SourGummy-Italic.ttf"),
    g: require("../assets/fonts/SourGummy-Regular.ttf"),
  })

  const {init, user} = useAuthStore()
  const {getTransactionsForDate} = useTransactionStore()
  const {getSubscriptions} = useSubscriptionStore()
  const {getYearlyOverview, getMonthlyOverview} = useAnalyticsStore()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded])

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (user) {
      const today = new Date(Date.now());
      getTransactionsForDate(today.toISOString().split('T')[0], user.id)
      getSubscriptions(user.id)
      getYearlyOverview(user.id)
      getMonthlyOverview(user.id)
    }
  }, [user]);

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="(auth)" options={{headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          <Stack.Screen name="+not-found"/>
        </Stack>
        <StatusBar style="dark"/>
        <Toast/>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}