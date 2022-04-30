import getStroke from 'perfect-freehand';
import { STROKE_WIDTH } from '../components/SketchCanvas/constants';
import type {
  Point,
  SketchCanvasProps,
} from '../components/SketchCanvas/types';
import { getSvgPathFromStroke } from '../utils';
import { proxy } from 'valtio';
import { derive } from 'valtio/utils';

interface CompletedPoints {
  id: number;
  points: Point[];
  color: SketchCanvasProps['strokeColor'];
  width: SketchCanvasProps['strokeWidth'];
  style: SketchCanvasProps['strokeStyle'];
}

export const drawingState = proxy({
  isDrawing: false,
  currentPoints: { points: null, strokeWidth: STROKE_WIDTH } as {
    points: Point[] | null;
    width?: SketchCanvasProps['strokeWidth'];
  },
  completedPoints: [] as CompletedPoints[],
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
