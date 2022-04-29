import getStroke from 'perfect-freehand';
import type { SketchCanvasProps } from 'src/components/types';
import { getSvgPathFromStroke } from 'src/utils';
import { proxy } from 'valtio';
import { derive } from 'valtio/utils';

type Point = {
  x: number;
  y: number;
};

export const drawingState = proxy({
  isDrawing: false,
  currentPoints: { points: null, strokeWidth: 8 } as {
    points: Point[] | null;
    width?: SketchCanvasProps['strokeWidth'];
  },
  completedPoints: [] as {
    id: number;
    points: Point[];
    color: SketchCanvasProps['strokeColor'];
    width: SketchCanvasProps['strokeWidth'];
    style: SketchCanvasProps['strokeStyle'];
  }[],
});

export const derivedPaths = derive({
  current: (get) =>
    get(drawingState).currentPoints.points !== null
      ? getSvgPathFromStroke(
          getStroke(get(drawingState).currentPoints.points!, {
            size: get(drawingState).currentPoints.width,
          })
        )
      : null,
  completed: (get) =>
    get(drawingState).completedPoints.map((point) => {
      const { points, width, ...rest } = point;
      return {
        path: getSvgPathFromStroke(
          getStroke(points, {
            size: width,
          })
        ),
        ...rest,
      };
    }),
});
