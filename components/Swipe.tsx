import {router} from "expo-router"
import React, {useState} from "react"
import {View} from "react-native"
import {Gesture, GestureDetector} from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import {useAuthStore} from "@/zustand/auth-store";
import {runOnJS,} from "react-native-worklets";

const BUTTON_WIDTH = 350
const BUTTON_HEIGHT = 100
const BUTTON_PADDING = 10
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS

const Swipe = () => {
  const {user} = useAuthStore()
  const [toggled, setToggled] = useState<boolean>(false)

  const X = useSharedValue(0)
  const completed = useSharedValue(toggled)


  const panGesture = Gesture.Pan()
    .onStart(() => {
      completed.value = toggled
    })
    .onUpdate((e) => {
      let newValue
      if (completed.value) {
        newValue = H_SWIPE_RANGE + e.translationX
      } else {
        newValue = e.translationX
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue
      }
    })
    .onEnd(() => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0)
        runOnJS(setToggled)(false)
      } else {
        X.value = withSpring(H_SWIPE_RANGE)
        if (user) {
          runOnJS(router.push)("/(tabs)/expense")
        } else {
          runOnJS(router.push)("/(auth)/sign-in")
        }
        runOnJS(setToggled)(true)
      }
    })


  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ["#5a9bd5", "#2c2c2c"]
        ),
      }
    }),
    text: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          [0, H_SWIPE_RANGE],
          [0.8, 0],
          Extrapolate.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              [0, H_SWIPE_RANGE],
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP
            ),
          },
        ],
      }
    }),
    wave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,
        opacity: interpolate(X.value, [0, H_SWIPE_RANGE], [0, 1]),
      }
    }),
  }

  return (
    <View
      className="bg-soft_white items-center justify-center"
      style={{
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        padding: BUTTON_PADDING,
        borderRadius: BUTTON_HEIGHT,
      }}
    >
      <Animated.View
        className="absolute left-0 bg-dark_slate"
        style={[
          {
            height: BUTTON_HEIGHT,
            borderRadius: BUTTON_HEIGHT,
          },
          AnimatedStyles.wave,
        ]}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          className="absolute z-10"
          style={[
            {
              height: SWIPEABLE_DIMENSIONS,
              width: SWIPEABLE_DIMENSIONS,
              borderRadius: SWIPEABLE_DIMENSIONS,
              left: BUTTON_PADDING,
            },
            AnimatedStyles.swipeable,
          ]}
        />
      </GestureDetector>
      <Animated.Text
        className="self-center text-xl text-dark_slate font-gb tracking-wider z-0"
        style={[AnimatedStyles.text]}
      >
        Let's get started
      </Animated.Text>
    </View>
  )
}

export default Swipe
