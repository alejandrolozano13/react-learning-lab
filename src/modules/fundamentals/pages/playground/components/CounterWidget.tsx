import "./Widget.css";
import { useState } from "react";
import { Button } from "../../../../../components/ui/button";

export const CounterWidget = () => {
  const [count, setCount] = useState<number>(0);

  const diminuirContador = () => setCount((prev) => prev - 1);
  const aumentarContador = () => setCount((prev) => prev + 1);
  const resetarContador = () => setCount(0);

  return (
    <div className="widget mb-4">
      <h2>Counter</h2>
      <p className="widget__value">{count}</p>

      <div className="widget__actions">
        <Button onClick={diminuirContador}>-1</Button>
        <Button onClick={aumentarContador}>+1</Button>
        <Button onClick={resetarContador}>Reset</Button>
      </div>
    </div>
  );
};