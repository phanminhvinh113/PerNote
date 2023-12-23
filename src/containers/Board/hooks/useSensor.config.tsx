import { MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

function useSensorConfig() {
  // Sensor for mouse on Website , That avoid click and trigger event drag
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Require the mouse to move by 10 pixels before activating
    },
  });

  // Sensor Mobile Device, Touch Screen
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 10,
    },
  });

  return useSensors(mouseSensor, touchSensor);
}
export default useSensorConfig;
