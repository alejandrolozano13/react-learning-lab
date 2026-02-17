import { useEffect, useState } from "react";
import { Button } from '../../../../components/ui/button';

export const EffectsLabPage = () => {
  const [count, setCount] = useState(0);
  console.log("render");

  useEffect(() => {
    console.log("effect rodou (apenas 1x");

    const id = setInterval(() => {
      setCount((c) => {
        console.log("tick, count =", c);
        return c;
      })
    }, 1000);

    return () => {
      clearInterval(id);
      console.log("cleanup (apenas ao desmontar)");
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Effects Lab</h1>
      <p>Count: {count}</p>

      <Button onClick={() => setCount((prev) => prev + 1)}>
        Incrementar
      </Button>
    </div>
  );
};