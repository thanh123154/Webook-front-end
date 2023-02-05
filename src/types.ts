import { type StaticImageData } from "next/image";

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type PropsHomeZenAiProtocolCard = {
  index?: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  desc: string;
};

export type PropsHomeZenArtGalleryCard = {
  image: StaticImageData;
  desc: string;
  tag: string;
};

export type PropsHomeZenVerifyAiCard = {
  index?: number;
  image: StaticImageData;
  title: string;
};

export type PropsHomeZenDefiAiCard = {
  image: StaticImageData;
  title: string;
  tag: string;
  colorTag: string;
};
