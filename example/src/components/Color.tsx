import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import Util from '../utils';

const Color = ({ color }: { color: string }) => {
  const snap = useSnapshot(state);

  const handleChangeColor = () => {
    state.strokeColor = color;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handleChangeColor}
      style={[
        {
          backgroundColor: color,
        },
        styles.color,
      ]}
    >
      {color === snap.strokeColor && (
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 100,
            backgroundColor: 'white',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Color;

const styles = StyleSheet.create({
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    ...Util.getElevation(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
