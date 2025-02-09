import { router } from "expo-router"
import React, { useState } from "react"
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler"
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

const BUTTON_WIDTH = 350
const BUTTON_HEIGHT = 100
const BUTTON_PADDING = 10
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS

const Swipe = () => {
  const [toggled, setToggled] = useState<boolean>(false)

  const X = useSharedValue(0)
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled
    },
    onActive: (e, ctx) => {
      let newValue
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX
      } else {
        newValue = e.translationX
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0)
        runOnJS(setToggled)(false)
      } else {
        X.value = withSpring(H_SWIPE_RANGE)
        runOnJS(router.push)("/(tabs)/expense")
        runOnJS(setToggled)(true)
      }
    },
  })

  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{ translateX: X.value }],
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ["#62b6c5", "#f1f1e8"]
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
    <GestureHandlerRootView
      className="bg-theme-white items-center justify-center"
      style={{
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        padding: BUTTON_PADDING,
        borderRadius: BUTTON_HEIGHT,
      }}
    >
      <Animated.View
        className="absolute left-0 bg-theme-black"
        style={[
          {
            height: BUTTON_HEIGHT,
            borderRadius: BUTTON_HEIGHT,
          },
          AnimatedStyles.wave,
        ]}
      />
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
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
      </PanGestureHandler>
      <Animated.Text
        className="self-center text-xl font-bold text-theme-black font-gummy tracking-wider z-0"
        style={[AnimatedStyles.text]}
      >
        Let's get started
      </Animated.Text>
    </GestureHandlerRootView>
  )
}

export default Swipe
