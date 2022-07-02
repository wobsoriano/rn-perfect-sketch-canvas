import {
  Canvas,
  Path,
  TouchInfo,
  useCanvasRef,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import { drawingState, derivedPaths } from '../../store';
import { useSnapshot } from 'valtio';
import { createHistoryStack, createSvgFromPaths } from '../../utils';
import type { SketchCanvasRef, SketchCanvasProps, Point } from './types';
import { ImageFormat } from './types';
import { STROKE_COLOR, STROKE_STYLE, STROKE_WIDTH } from './constants';

export const SketchCanvas = forwardRef<SketchCanvasRef, SketchCanvasProps>(
  (
    {
      strokeWidth = STROKE_WIDTH,
      strokeColor = STROKE_COLOR,
      strokeStyle = STROKE_STYLE,
      containerStyle,
      children,
      topChildren,
    },
    ref
  ) => {
    const pathsSnapshot = useSnapshot(derivedPaths);
    const canvasRef = useCanvasRef();
    const stack = useMemo(
      () =>
        createHistoryStack({
          currentPoints: drawingState.currentPoints,
          completedPoints: drawingState.completedPoints,
        }),
      []
    );

    useEffect(() => {
      drawingState.currentPoints.width = strokeWidth;
    }, [strokeWidth]);

    useImperativeHandle(ref, () => ({
      reset() {
        drawingState.currentPoints.points = null;
        drawingState.completedPoints = [];
        stack.push({
          currentPoints: drawingState.currentPoints,
          completedPoints: drawingState.completedPoints,
        });
      },
      undo() {
        const value = stack.undo();
        drawingState.currentPoints = value.currentPoints;
        drawingState.completedPoints = value.completedPoints;
      },
      redo() {
        const value = stack.redo();
        drawingState.currentPoints = value.currentPoints;
        drawingState.completedPoints = value.completedPoints;
      },
      toBase64: (format, quality) => {
        const image = canvasRef.current?.makeImageSnapshot();
        if (image) {
          return image.encodeToBase64(
            // @ts-expect-error: Internal
            format ?? ImageFormat.PNG,
            quality ?? 100
          );
        }
        return undefined;
      },
      toImage: () => {
        return canvasRef.current?.makeImageSnapshot();
      },
      toSvg: (width, height, backgroundColor) => {
        return createSvgFromPaths(derivedPaths.completed, {
          width,
          height,
          backgroundColor,
        });
      },
      toPoints: () => {
        return drawingState.completedPoints.map((p) => p.points);
      },
      addPoints: (points: Point[][]) => {
        const formatted = points.map((data) => ({
          id: Date.now(),
          points: data,
          color: STROKE_COLOR,
          width: STROKE_WIDTH,
          style: STROKE_STYLE,
        }));
        drawingState.completedPoints = formatted;
      },
    }));

    const touchHandler = useTouchHandler(
      {
        onStart: (touchInfo: TouchInfo) => {
          drawingState.isDrawing = true;
          drawingState.currentPoints.points = [[touchInfo.x, touchInfo.y]];
        },
        onActive: (touchInfo: TouchInfo) => {
          if (!drawingState.isDrawing) {
            return;
          }

          drawingState.currentPoints.points = [
            ...(drawingState.currentPoints.points ?? []),
            [touchInfo.x, touchInfo.y],
          ];
        },
        onEnd: (touchInfo: TouchInfo) => {
          drawingState.isDrawing = false;

          if (!drawingState.currentPoints.points) {
            return;
          }

          drawingState.completedPoints = [
            ...drawingState.completedPoints,
            {
              id: touchInfo.timestamp,
              points: drawingState.currentPoints.points,
              width: drawingState.currentPoints.width,
              color: strokeColor,
              style: strokeStyle,
            },
          ];
          drawingState.currentPoints.points = null;

          stack.push({
            currentPoints: drawingState.currentPoints,
            completedPoints: drawingState.completedPoints,
          });
        },
      },
      [strokeColor, strokeStyle]
    );

    return (
      <Canvas ref={canvasRef} onTouch={touchHandler} style={containerStyle}>
        {children}
        {pathsSnapshot.completed.map((path) => (
          <Path
            path={path.path}
            key={path.id}
            style={path.style}
            color={path.color}
          />
        ))}
        {pathsSnapshot.current ? (
          <Path
            path={pathsSnapshot.current}
            color={strokeColor}
            style={strokeStyle}
          />
        ) : (
          <></>
        )}
        {topChildren}
      </Canvas>
    );
  }
);
