/**
 * A function to get elevation style for android/ios.
 * @param elevation
 * @returns
 */
const getElevation = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0.3 * elevation, height: 0.5 * elevation },
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * elevation,
  };
};

export default {
  getElevation,
};
