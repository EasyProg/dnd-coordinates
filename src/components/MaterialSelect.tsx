import classNames from 'classnames';
import { useState } from 'react';
import { materails } from '../consts';
import { useCircles } from './ContextProvider';
import styles from './MaterialSelect.module.scss';
import { Button } from './ui/Button';

export const MaterialSelect = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { circles } = useCircles();

  return (
    <>
      <Button
        className={styles.submitButton}
        label="Submit"
        onClick={() => console.log({ circles, selectedItem })}
      />
      <div className={styles.materialContainer}>
        <h3 className={styles.materialHeader}>Material</h3>
        {materails.map((item) => (
          <div
            className={classNames(styles.materialItem, {
              [styles.selected]: selectedItem === item.id,
            })}
            onClick={() => setSelectedItem(item.id)}
            key={item.id}
          >
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
};
