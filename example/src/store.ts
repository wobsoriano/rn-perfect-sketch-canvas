import { proxy } from 'valtio';

export const state = proxy({
  strokeColor: 'black',
  strokeWidth: 8,
});
