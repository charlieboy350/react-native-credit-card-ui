import { useRef } from "react";
import { Animated } from "react-native";

const useRotationHook = (props) => {
    const animation = useRef(new Animated.Value(0)).current;

    const startAnimation = (val = 1) => {
        Animated.timing(animation, {
            toValue: val,
            duration: 750,
            useNativeDriver: true,
        }).start()
    }

    //interpolate
    const rotateInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [props?.initialDeg || "0deg", props?.finalDeg || "180deg"],
    });

    return {rotateInterpolation, startAnimation};
}

export default useRotationHook;