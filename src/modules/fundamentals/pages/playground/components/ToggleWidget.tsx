import "./Widget.css";
import { useState } from "react";
import { Switch } from "./../../../../../components/ui/switch";

export const ToggleWidget = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const onClickSwitch = () => setIsOn((prev) => !prev);

  return (
    <div className={`widget ${isOn ? "widget-active" : ""} mb-4`}>
      <h2>Toogle</h2>
      <Switch checked={isOn} onCheckedChange={onClickSwitch}/>
    </div>
  );
};