import React from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const Stroke = ({
  onPress,
  stroke,
}: {
  stroke: number;
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  const snap = useSnapshot(state);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 25,
          backgroundColor: snap.strokeColor,
          height: stroke,
          borderRadius: 10,
          transform: [
            {
              rotateZ: '-45deg',
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

export default Stroke;
