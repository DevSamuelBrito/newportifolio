//next/image types
import { StaticImageData } from "next/image";

//react-icons types
import type { IconType } from "react-icons";

export type Project = {
  id: string;
  index: number;
  src: StaticImageData;
  stack: IconType[];
  post?: string;
  website?: string;
  repository: string;
  title: string;
  descriptionBr: string[];
  descriptionEn: string[];
};
