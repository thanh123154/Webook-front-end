import { BsShop } from "react-icons/bs";
import { BiFridge } from "react-icons/bi";
import { RiComputerLine } from "react-icons/ri";
import {
  MdOutlineRoomService,
  MdPool,
  MdLocalLaundryService,
  MdMicrowave,
  MdIron,
  MdBalcony,
  MdPets,
} from "react-icons/md";
import { AiOutlineWifi, AiOutlineFire } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { TbWind, TbToolsKitchen2, TbWiperWash } from "react-icons/tb";
import { FaParking } from "react-icons/fa";
import { GiChickenOven, GiFireplace } from "react-icons/gi";
import { SiWindicss } from "react-icons/si";

export const amenityListings = [
  { value: "Fridge", label: "Fridge", icon: <BiFridge /> },
  { value: "Pc", label: "Pc", icon: <RiComputerLine /> },
  {
    value: "RoomService",
    label: "Room service",
    icon: <MdOutlineRoomService />,
  },
  { value: "WiFi", label: "WiFi", icon: <AiOutlineWifi /> },
  { value: "TV", label: "TV", icon: <MdOutlineRoomService /> },
  { value: "Pool", label: "Pool", icon: <MdPool /> },
  { value: "Gym", label: "Gym", icon: <CgGym /> },
  {
    value: "AirCon",
    label: "Air conditioning",
    icon: <TbWind />,
  },
  { value: "Parking", label: "Parking", icon: <FaParking /> },
  { value: "Laundry", label: "Laundry", icon: <MdLocalLaundryService /> },
  { value: "Kitchen", label: "Kitchen", icon: <TbToolsKitchen2 /> },
  { value: "Microwave", label: "Microwave", icon: <MdMicrowave /> },
  { value: "Oven", label: "Oven", icon: <GiChickenOven /> },
  { value: "Dishwasher", label: "Dishwasher", icon: <TbWiperWash /> },
  { value: "HairDryer", label: "Hair dryer", icon: <SiWindicss /> },
  { value: "Iron", label: "Iron", icon: <MdIron /> },
  { value: "Heating", label: "Heating", icon: <AiOutlineFire /> },
  { value: "Balcony", label: "Balcony", icon: <MdBalcony /> },
  { value: "Fireplace", label: "Fireplace", icon: <GiFireplace /> },
  {
    value: "PetFriendly",
    label: "Pet friendly",
    icon: <MdPets />,
  },
];
