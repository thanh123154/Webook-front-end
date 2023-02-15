import { CgProfile } from "react-icons/cg";

const menu = [
  { name: "WHITEPAPER", link: " https://whitepaper.warriorempires.io/" },
  { name: "TOKENOMICS", link: "/tokenomics" },
  { name: "LAND SALE", link: "" },
  { name: "ROADMAP", link: "/roadmap" },
  { name: "LORD SALE", link: "/lord-sale" },

  { name: "NFT BOX", link: "" },
  {
    name: "COMMUNITY",
    link: "",
    children: [
      {
        name: "Discord",
        link: "https://discord.com/invite/warriorempires",
        svg: <CgProfile />,
      },
      {
        name: "Twitter",
        link: "https://twitter.com/WARRIOREMPIRES",
        svg: <CgProfile />,
      },
      {
        name: "Instagram",
        link: "https://www.instagram.com/warriorempires.io/",
        svg: <CgProfile />,
      },
      {
        name: "YouTube",
        link: " https://www.youtube.com/@warriorempiresio",
        svg: <CgProfile />,
      },
      {
        name: "Telegram",
        link: "https://t.me/warriorempiresofficial",
        svg: <CgProfile />,
      },
      // {
      //   name: "Medium",
      //   link: "https://medium.com/@warriorempires",
      //   svg: <MediumIcon />,
      // },
    ],
  },
];

const subPageNewsPaper = [
  {
    name: "Newspaper",
    link: "",
    svg: <CgProfile />,
  },
];

export const MenuItem = {
  menu,
  subPageNewsPaper,
};
