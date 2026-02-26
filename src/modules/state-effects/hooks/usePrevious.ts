/**
 * ! CustomHook que serve para obtermos o último valor da renderização passada.
 * 
 * Ex de uso: Para pesquisas onde o usuario tinha x valor, digita, apaga e volta pro mesmo -- conseguimos evitar req.
 */

import { useEffect, useRef } from "react";

export function usePrevious<T> (value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);
    
    useEffect(() => {
        ref.current = value;
    }, [value]);
    
    return ref.current;
}