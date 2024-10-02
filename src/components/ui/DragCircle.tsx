import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';
import styles from './DragCircle.module.scss';

type PositionProps = {
  left: number;
  top: number;
  isDragged?: boolean;
  key?: number | string;
};

export const DragCircle: FC<HTMLAttributes<HTMLDivElement> & PositionProps> = ({
  onMouseDown,
  left,
  top,
  isDragged = false,
  key,
}) => {
  return (
    <div
      className={classNames(styles.circle, { [styles.dragged]: isDragged })}
      onMouseDown={onMouseDown}
      style={{
        transform: `translate(${left}px, ${top}px)`,
      }}
      key={key}
    />
  );
};
