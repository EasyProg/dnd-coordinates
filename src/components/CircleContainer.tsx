import { FC, MouseEvent, useRef, useState } from 'react';
import { circleRadius } from '../consts';
import { isValidPosition } from '../heplers/isValidPosition';
import { ReactComponent as PlusIcon } from '../plus.svg';
import styles from './CircleContainer.module.scss';
import { useCircles } from './ContextProvider';
import { Button } from './ui/Button';
import { DragCircle } from './ui/DragCircle';
import { Input } from './ui/Input';

type PositionCoords = {
  x: number;
  y: number;
};

export const CircleContainer: FC = () => {
  const { circles, addCircle, updateCircle, deleteCircle } = useCircles();
  const fieldRef = useRef<HTMLDivElement>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<PositionCoords>({ x: 0, y: 0 });
  const [inputValues, setInputValues] = useState(
    circles.map((circle) => ({ x: circle.x, y: circle.y })),
  );

  const handleMouseDown = (index: number, event: MouseEvent) => {
    setDraggingIndex(index);
    setCurrentPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (draggingIndex !== null && currentPosition) {
      const fieldRect = fieldRef?.current;
      const draggableCircle = circles[draggingIndex];
      const dx = e.clientX - currentPosition.x;
      const dy = e.clientY - currentPosition.y;

      const newX = draggableCircle.x + dx;
      const newY = draggableCircle.y + dy;

      // Check if circle is out of range or overlaps another one
      if (fieldRect && isValidPosition(draggingIndex, newX, newY, circles, fieldRect)) {
        updateCircle(draggingIndex, newX, newY);
        setInputValues((prevValues) =>
          prevValues.map((val, i) =>
            i === draggingIndex ? { x: Math.round(newX), y: Math.round(newY) } : val,
          ),
        );
      }

      setCurrentPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
    setCurrentPosition({ x: 0, y: 0 });
  };

  const handleCoordinateChange = (index: number, field: 'x' | 'y', value: string) => {
    setInputValues((prevValues) =>
      prevValues.map((val, i) => (i === index ? { ...val, [field]: value } : val)),
    );
  };

  const handleCoordinateBlur = (index: number) => {
    const { x, y } = inputValues[index];
    const container = fieldRef.current || undefined;
    const newX = Number(x);
    const newY = Number(y);

    if (isValidPosition(index, newX, newY, circles, container)) {
      updateCircle(index, newX, newY);
      setInputValues((prevValues) =>
        prevValues.map((val, i) => (i === index ? { x: newX, y: newY } : val)),
      );
    }
  };

  const handleAddCircle = () => {
    const fieldRect = fieldRef.current?.getBoundingClientRect();
    const newX = Math.random() * ((fieldRect?.width || 0) - 2 * circleRadius) + circleRadius;
    const newY = Math.random() * ((fieldRect?.height || 0) - 2 * circleRadius) + circleRadius;
    addCircle(newX, newY);
    setInputValues([...inputValues, { x: Math.round(newX), y: Math.round(newY) }]);
  };

  return (
    <div className={styles.appContainer}>
      <div
        ref={fieldRef}
        className={styles.main}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {circles.map((circle, index) => (
          <DragCircle
            key={circle.id}
            left={circle.x}
            top={circle.y}
            isDragged={draggingIndex === index}
            onMouseDown={(e: MouseEvent) => handleMouseDown(index, e)}
          />
        ))}
      </div>
      <div className={styles.coordinatesContainer}>
        <div className={styles.headerContainer}>
          <h3 className={styles.materialHeader}>Distances</h3>
          <Button onClick={handleAddCircle}>
            <PlusIcon />
          </Button>
        </div>
        {circles.map((circle, index) => (
          <div key={circle.id} className={styles.coordinates}>
            <div className={styles.label}>
              <span>X:</span>
              <Input
                value={`${inputValues[index].x}`}
                isDragged={draggingIndex === index}
                onChange={(value) => handleCoordinateChange(index, 'x', value)}
                onBlur={() => handleCoordinateBlur(index)}
                max={950}
              />
            </div>
            <div className={styles.label}>
              <span>Y:</span>
              <Input
                value={`${inputValues[index].y}`}
                isDragged={draggingIndex === index}
                onChange={(value) => handleCoordinateChange(index, 'y', value)}
                onBlur={() => handleCoordinateBlur(index)}
                max={450}
              />
            </div>
            <Button
              type="delete"
              onClick={() => {
                const resultValues = [...inputValues];
                deleteCircle(circle.id);
                resultValues.splice(index, 1);
                setInputValues(resultValues);
              }}
            >
              -
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
