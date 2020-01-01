import randomColor from "randomcolor";
const dynamicColors = i => {
  return randomColor();
};

const randomColorHelper = data => {
  const colors = [];
  for (let i in data) {
    colors.push(dynamicColors(i));
  }
  return colors;
};

export { randomColorHelper };
