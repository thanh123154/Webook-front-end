import { User } from "@prisma/client";
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

export type TableHistoryData = {
  id: string;
  name: string;
  address: string;
  priceLongTerm: number;
  priceShortTerm: number;
  gallery: string;
  desc: string;
  beds: number;

  bedsrooms: number;
  bathrooms: number;
  guests: number;
  detail: string;
  province: string;
  district: string;
  ward: string;
  destination: string;
  active: boolean;
  approved: boolean;
};

export type ListingData = {
  id: string;
  name: string;
  address: string;
  priceLongTerm: number;
  priceShortTerm: number;
  gallery: string;
  desc: string;
  beds: number;
  bedsrooms: number;
  bathrooms: number;
  guests: number;
  // host: UserData;
  detail: string;
  province: string;
  district: string;
  ward: string;
  destination: string;
  active: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ListingAndUserData = {
  id: string;
  name: string;
  address: string;
  priceLongTerm: number;
  priceShortTerm: number;
  gallery: string;
  desc: string;
  beds: number;
  bedsrooms: number;
  bathrooms: number;
  guests: number;
  host: User & { email: string | null };
  detail: string;
  province: string;
  district: string;
  ward: string;
  destination: string;
  active: boolean;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PicContent = {
  id: number;
};
export type predictionData = {
  description: string;
  value: string;
  place_id: string;
};

export interface SearchData {
  predictions: Array<predictionData>;
}

export interface SearchApi {
  data: SearchData;
}

export type LocationData = {
  city: string;
  city_code: string;
  district: string;
  district_id: string;
  ward: string;
  ward_id: string;
};

export type BookingData = {
  id: string;
  guestId: string;
  listingId: string;
  checkIn: Date;
  checkOut: Date;
  total: number;
  guest: number;
  isDenied: boolean;
  rating: number;
  phoneNumber: string;
  review: string;
};

export type FormSearchListingProps = {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guest: number | undefined;
};
