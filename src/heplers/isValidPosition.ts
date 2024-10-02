import { CircleType } from '../components/ContextProvider';
import { circleRadius } from '../consts';

const isValidPosition = (
  index: number,
  x: number,
  y: number,
  circles: CircleType[],
  coords: Partial<DOMRect> = { top: 0, left: 0 },
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
      const distance = Math.sqrt(
        (circles[i].x - x + (coords.left || 0)) ** 2 + (circles[i].y - y + (coords.top || 0)) ** 2,
      );
      if (distance < 2 * circleRadius) {
        return false;
      }
    }
  }

  return true;
};

export { isValidPosition };
