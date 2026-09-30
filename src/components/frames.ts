import type { FrameColor } from "@/content/types";

/** Rahmenfarbe mit passender Textfarbe */
export const frameClasses: Record<FrameColor, string> = {
  gelb: "bg-gelb text-tinte",
  tinte: "bg-tinte text-leinen",
  petrol: "bg-petrol text-leinen",
};

/** Button, der auf der jeweiligen Rahmenfarbe genug Kontrast hat */
export const frameButtonClasses: Record<FrameColor, string> = {
  gelb: "bg-tinte text-leinen hover:bg-petrol",
  tinte: "bg-gelb text-tinte hover:bg-leinen",
  petrol: "bg-leinen text-tinte hover:bg-sand",
};
