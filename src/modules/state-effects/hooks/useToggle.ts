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

    const setOn = useCallback(() => setValue(true), []);
    const setOff = useCallback(() => setValue(false), []);
    const toggle = useCallback(() => setValue((v) => !v), []);
    const set = useCallback((next: boolean) => setValue(next), []);

    return { value, setOn, setOff, toggle, set };
}