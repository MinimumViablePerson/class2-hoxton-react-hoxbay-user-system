type Color = "green"| "red"| "blue"| "yellow";

const availableColors: Color[] = ["green", "red", "blue", "yellow"];

export function getRandomColor(): `var(--${Color})` {
  
  const randColour = availableColors[Math.floor(Math.random() * 4)];

  return `var(--${randColour})`;
}
