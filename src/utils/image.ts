import { StaticImageData } from "next/image";

export const imageSrc = (image: string | StaticImageData | any): string =>
  typeof image === "string" ? image : image.src;
