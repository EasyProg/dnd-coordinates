import classNames from 'classnames';
import { FC, HTMLProps } from 'react';
import styles from './Button.module.scss';

export const Button: FC<HTMLProps<HTMLButtonElement>> = ({
  onClick,
  label,
  children,
  type = 'general',
  className,
}) => {
  return (
    <button
      className={classNames(className, {
        [styles.button]: type === 'general',
        [styles.deleteButton]: type === 'delete',
      })}
      onClick={onClick}
    >
      {children ? children : label}
    </button>
  );
};
