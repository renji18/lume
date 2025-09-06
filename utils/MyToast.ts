import Toast from "react-native-toast-message"

const MyToast = (type: "success" | "error" | "info", msg: string) => {
  Toast.show({
    type,
    text1: msg,
    text1Style: {
      fontSize: 20,
      fontFamily: "gsb",
      color: "#233337",
    },
    position: "bottom",
    avoidKeyboard: false,
  })
}

export default MyToast
