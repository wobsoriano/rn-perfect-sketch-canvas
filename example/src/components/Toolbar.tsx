import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSnapshot } from 'valtio';
import constants from '../constants';
import { state } from '../store';
import utils from '../utils';
import Color from './Color';
import Stroke from './Stroke';

const Toolbar = () => {
  const [showStrokes, setShowStrokes] = useState(false);
  const snap = useSnapshot(state);

  const handleStrokeChange = (stroke: number) => {
    state.strokeWidth = stroke;
    setShowStrokes(false);
  };

  return (
    <>
      {showStrokes && (
        <View
          style={[
            styles.toolbar,
            {
              bottom: 80,
              position: 'absolute',
            },
          ]}
        >
          {constants.strokes.map((stroke) => (
            <Stroke
              key={stroke}
              stroke={stroke}
              onPress={() => handleStrokeChange(stroke)}
            />
          ))}
        </View>
      )}

      <View
        style={[styles.toolbar, { position: 'relative', marginVertical: 12 }]}
      >
        <View
          style={{
            backgroundColor: '#f7f7f7',
            borderRadius: 5,
          }}
        >
          {showStrokes && (
            <View
              style={{
                width: 5,
                height: 5,
                borderRadius: 100,
                backgroundColor: 'black',
                alignSelf: 'center',
                position: 'absolute',
              }}
            />
          )}

          <Stroke
            stroke={snap.strokeWidth}
            onPress={() => setShowStrokes(!showStrokes)}
          />
        </View>

        <View
          style={{
            height: 30,
            borderWidth: 1,
            borderColor: '#f0f0f0',
            marginHorizontal: 10,
          }}
        />

        {constants.colors.map((item) => (
          <Color key={item} color={item} />
        ))}
      </View>
    </>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 300,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...utils.getElevation(5),
  },
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    ...utils.getElevation(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
