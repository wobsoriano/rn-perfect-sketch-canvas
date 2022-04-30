import * as React from 'react';
import { useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  useWindowDimensions,
} from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';
import Header from './components/Header';

export default function App() {
  const { width } = useWindowDimensions();
  const canvasRef = useRef<SketchCanvasRef>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: '#f0f0f0',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Header canvasRef={canvasRef} />
        <View
          style={{
            width: width - 24,
            flexGrow: 1,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            overflow: 'hidden',
            elevation: 1,
          }}
        >
          <SketchCanvas ref={canvasRef} containerStyle={styles.container} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
