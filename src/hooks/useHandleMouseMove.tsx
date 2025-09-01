import { useState } from 'react';

export default function useHandleMouseMove({
  multiplier = 2,
  initial = { x: 0, y: 0 },
} = {}) {
  const [mousePosition, setMousePosition] = useState(initial);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * multiplier;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * multiplier;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition(initial);
  };

  return {
    mousePosition,
    handleMouseMove,
    handleMouseLeave,
    isHovered,
    setIsHovered,
    setMousePosition,
  };
}
