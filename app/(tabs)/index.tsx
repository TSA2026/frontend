import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Text, View } from "react-native";


export default function Index() {

  const [valueOne, setValueOne] = useState(50);
  const [valueTwo, setValueTwo] = useState(50);
  const [valueThree, setValueThree] = useState(50);
  const [valueFour, setValueFour] = useState(50);
  let [showModeOne, setShowModeOne] = useState(true);
  let [showModeTwo, setShowModeTwo] = useState(false);
  {/*
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [showSplash, setShowSplash] = useState(true);
    
    useEffect(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }).start(() => {setShowSplash(false);});
      }, 1200);
    }, []);
  
    if (showSplash) {
      return (
        <View className="flex-1 bg-[#000] justify-center items-center">
          <Animated.View style={{opacity: fadeAnim}}>
            <Text className="font-extrabold color-white text-6xl">TSA2026</Text>
          </Animated.View>
        </View>
      );
    }
    */}
  
  return (
    <View className="items-center flex-1 bg-black">
      <View className="w-[22em] h-[16em] bg-[#0f0D23] mb-[12em] mt-[6em] rounded-full justify-center items-center">
        <Text className="color-white font-bold text-2xl">Bluetooth holder</Text>
      </View>
      <View className="w-[22rem] h-[2.5em] bg-[#0f0D23] rounded-full mb-[1em] flex-row items-center justify-center">
        <Text className="color-white font-bold" onPress={() => {setShowModeOne(true); setShowModeTwo(false);}}>
          Mode 1
        </Text>
        <Text className="color-white font-bold ml-12" onPress={() => {setShowModeOne(false); setShowModeTwo(true)}}>
          Mode 2
        </Text>
      </View>
      {showModeOne && (
      <View className="w-4/5 px-5">
        <Text className="color-white text-lg text-center">SliderOne: {valueOne.toFixed(0)}</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={valueOne}
          onValueChange={setValueOne}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1fb28a"
        />
        <Text className="color-white text-lg text-center mt-2.5">SliderTwo: {valueTwo.toFixed(0)}</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          value={valueTwo}
          onValueChange={setValueTwo}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1fb28a"
        />
      </View>
      )}
      {showModeTwo && (
        <View className="w-4/5 px-5">
          <Text className="color-white text-lg text-center">SliderThree: {valueThree.toFixed(0)}</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={valueThree}
            onValueChange={setValueThree}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1fb28a"
          /> 
          <Text className="color-white text-lg text-center mt-2.5">SliderFour: {valueFour.toFixed(0)}</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={valueFour}
            onValueChange={setValueFour}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1fb28a"
          /> 
        </View>
      )}
    </View>
  );
}
