import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { uniqueId } from '../heplers/uniqueId';

export type CircleType = {
  id?: string;
  x: number;
  y: number;
};

type CirclesContextType = {
  circles: CircleType[];
  addCircle: (x: number, y: number) => void;
  updateCircle: (id: number, x: number, y: number) => void;
  deleteCircle: (id?: string) => void;
};

// Create context for circles
const CircleContext = createContext<CirclesContextType>({
  circles: [],
  addCircle: () => false,
  updateCircle: () => false,
  deleteCircle: () => false,
});

export const useCircles = () => useContext(CircleContext);

export const CircleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [circles, setCircles] = useState<CircleType[]>([{ x: 10, y: 10 }]);

  const addCircle = (x: number, y: number) => {
    const id = uniqueId();
    setCircles([...circles, { x, y, id }]);
  };

  const updateCircle = (index: number, x: number, y: number) => {
    const updatedCircles = [...circles];
    updatedCircles[index] = { ...updatedCircles[index], x, y };
    setCircles(updatedCircles);
  };

  const deleteCircle = (id?: string) => {
    const updatedCircles = [...circles];
    const deleteItem = updatedCircles.find((item) => item.id === id);
    if (deleteItem) {
      updatedCircles.splice(updatedCircles.indexOf(deleteItem), 1);
      setCircles(updatedCircles);
    }
  };

  return (
    <CircleContext.Provider value={{ circles, addCircle, updateCircle, deleteCircle }}>
      {children}
    </CircleContext.Provider>
  );
};
