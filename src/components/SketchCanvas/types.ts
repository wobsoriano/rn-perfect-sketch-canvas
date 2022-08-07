import type { Color, ImageFormat, SkImage } from '@shopify/react-native-skia';
import type { StyleProp, ViewStyle } from 'react-native';
import type { CompletedPoints } from 'src/store';


export type StrokeStyle = 'stroke' | 'fill';

export interface SketchCanvasRef {
  reset: () => void;
  undo: () => void;
  redo: () => void;
  toBase64: (format?: ImageFormat, quality?: number) => string | undefined;
  toImage: () => SkImage | undefined;
  toSvg: (width: number, height: number, backgroundColor?: string) => string;
  toPath: () => CompletedPoints[];
  drawPath: (path: CompletedPoints[]) => void;
  toPoints: () => Point[][];
  addPoints: (points: Point[][], style?: StyleOptions) => void;
}

export interface SketchCanvasProps {
  strokeWidth?: number;
  strokeColor?: Color;
  strokeStyle?: 'stroke' | 'fill';
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  topChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
}

export interface StyleOptions {
  strokeColor?: Color;
  strokeStyle?: 'stroke' | 'fill';
  strokeWidth?: number;
}

export type Point = [number, number];
