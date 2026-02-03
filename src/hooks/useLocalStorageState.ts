import { useEffect, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] { // tipando nosso retorno
  const [value, setValue] = useState<T>(() => { // lazy initializer // apenas no primeiro render aparece // dps é ignorado
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return initialValue;
      return JSON.parse(stored) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect( // isso aqui vai rodar apos usarmos o setValue atraves do set de favoritos que obriga re-render
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value], // o value mudou agora foi acrescentado o removido, entao o key é atualizado no local storage
  );
  return [value, setValue]; // não precisamos do as const pois ja tipamos
}