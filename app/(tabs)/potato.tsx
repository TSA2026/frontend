import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const potato = () => {
  const [value, setValue] = useState(50);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Value: {value.toFixed(0)}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1fb28a"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

});
export default potato




  