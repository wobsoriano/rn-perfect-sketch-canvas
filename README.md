# rn-perfect-sketch-canvas

A React Native component for drawing perfect pressure-sensitive freehand lines using [perfect-freehand](https://github.com/steveruizok/perfect-freehand) and Skia renderer.

## Installation

```sh
npm install @shopify/react-native-skia rn-perfect-sketch-canvas
```

## Usage

```tsx
import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-perfect-sketch-canvas';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SketchCanvas
        strokeColor={'black'}
        strokeWidth={8}
        containerStyle={styles.container}
      />
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
| `undo`      | Delete the latest path.   |
| `redo`      | number   |
| `toBase64`      | Get the base64 of image.   |
| `toImage`      | Get a snapshot from the canvas in the surface   |
| `toSvg`      | Get the svg string of all paths   |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
