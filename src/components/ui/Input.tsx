import classNames from 'classnames';
import { FC } from 'react';
import styles from './Input.module.scss';

export type ValueProps<T> = {
  /**
   * Value
   */
  value?: T;
  /**
   * Callback on change
   * @param {T} value
   */
  onChange: (value: T) => void;
  onBlur?: (value: T) => void;
  isDragged?: boolean;
  max: number;
};

export const Input: FC<ValueProps<string>> = ({ onChange, onBlur, value, isDragged, max }) => {
  return (
    <input
      type="number"
      className={classNames(styles.input, { [styles.dragged]: isDragged })}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      onBlur={(e) => onBlur && onBlur(e.target.value)}
      min={0}
      max={max}
    />
  );
};
