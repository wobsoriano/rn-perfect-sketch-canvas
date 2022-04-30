# rn-perfect-sketch-canvas

A React Native component for drawing perfect pressure-sensitive freehand lines using [perfect-freehand](https://github.com/steveruizok/perfect-freehand) and [Skia renderer](https://shopify.github.io/react-native-skia/).

## Installation

```sh
npm install @shopify/react-native-skia rn-perfect-sketch-canvas
```

## Usage

```tsx
import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';

export default function App() {
  const canvasRef = useRef<SketchCanvasRef>(null);

  return (
    <SafeAreaView style={styles.container}>
      <SketchCanvas
        ref={canvasRef}
        strokeColor={'black'}
        strokeWidth={8}
        containerStyle={styles.container}
      />
      <Button onPress={canvasRef.current?.reset} title="Reset" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Props

| Property           | Type     | Default | Description                                           |
| ------------------ | -------- | ------- | ----------------------------------------------------- |
| `containerStyle`   | object   | {}       | Styles to be applied on canvas component.            |
| `strokeColor`      | string   | black   | Color of stroke.                                      |
| `strokeWidth`      | number   | .5      | Size (diameter) of the stroke.                        |

## Methods

| Method           | Description|
| ------------------ | -------- |
| `reset`   | Clear all the paths.   |
| `undo`      | Undo   |
| `redo`      | Redo   |
| `toBase64`      | Get the base64 of image.   |
| `toImage`      | Get a snapshot from the canvas in the surface.   |
| `toSvg`      | Get the svg string of all paths.   |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Inspired By

Please check out these previous works that helped inspire the creation of rn-perfect-sketch-canvas.

- [terrylinla/react-native-sketch-canvas](https://github.com/terrylinla/react-native-sketch-canvas) - A React Native component for drawing by touching on both iOS and Android.
- [uragirii/rn-skia-sketch-canvas](https://github.com/uragirii/rn-skia-sketch-canvas) - A React Native component for drawing using Skia renderer.

## License

MIT
