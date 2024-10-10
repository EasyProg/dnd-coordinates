import { CircleType } from '../components/ContextProvider';
import { circleRadius } from '../consts';

const isValidPosition = (
  index: number,
  x: number,
  y: number,
  circles: CircleType[],
  fieldRect?: HTMLDivElement,
) => {
  const fieldRectDefault = fieldRect || { clientWidth: 0, clientHeight: 0 };
  const clientWidth = fieldRectDefault.clientWidth;
  const clientHeight = fieldRectDefault.clientHeight;

  if (
    x <= 0 ||
    x + circleRadius * 2 >= clientWidth ||
    y <= 0 ||
    y + circleRadius * 2 >= clientHeight
  ) {
    return false;
  }

  for (let i = 0; i < circles.length; i++) {
    if (i !== index) {
      const distance = Math.sqrt((circles[i].x - x) ** 2 + (circles[i].y - y) ** 2);
      if (distance < 2 * circleRadius) {
        return false;
      }
    }
  }

  return true;
};

export { isValidPosition };
