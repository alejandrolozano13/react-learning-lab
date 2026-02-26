import { useCallback, useState } from "react";

type ToggleApi = {
    value: boolean;
    setOn: () => void;
    setOff: () => void;
    toggle: () => void;
    set: (next: boolean) => void;
};

export function useToggle(initial = false): ToggleApi {
    const [value, setValue] = useState<boolean>(initial);

    const setOn = useCallback(() => setValue(true), []); // lógica interna
    const setOff = useCallback(() => setValue(false), []); // lógiica interna
    const toggle = useCallback(() => setValue((v) => !v), []); // para ação do usuario
    const set = useCallback((next: boolean) => setValue(next), []); // sincronização externa

    return { value, setOn, setOff, toggle, set };
}