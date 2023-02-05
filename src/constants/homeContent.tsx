import {
  HomeZenArtGalleryBanner1,
  HomeZenArtGalleryBanner2,
  HomeZenArtGalleryBanner3,
  HomeZenDefiAiBanner1,
  HomeZenDefiAiBanner2,
  HomeZenDefiAiBanner3,
  HomeZenVerifyAiBanner1,
  HomeZenVerifyAiBanner2,
  HomeZenVerifyAiBanner3,
  HomeZenVerifyAiBanner4,
} from "../assets/imgs";
import { HomeZenArtAi, HomeZenChatAi, HomeZenDefiAi, HomeZenVerifyAi } from "../assets/svgs";
import type {
  PropsHomeZenAiProtocolCard,
  PropsHomeZenArtGalleryCard,
  PropsHomeZenDefiAiCard,
  PropsHomeZenVerifyAiCard,
} from "../types";

export const homeZenAiProtocolContent: Array<PropsHomeZenAiProtocolCard> = [
  {
    icon: <HomeZenVerifyAi />,
    title: "ZEN verify.ai",
    subtitle: "Advanced AI System for Authenticity Verification and Fraud Protection in Projects and Smart Contracts",
    desc: "Utilizing cutting-edge technology, VerifyAI scans and analyzes project information, comparing it to vast databases of authorized and verified sources to ensure its authenticity and examining smart contract code for security and integrity.",
  },
  {
    icon: <HomeZenDefiAi />,
    title: "ZEN DeFi.AI",
    subtitle:
      "DeFiAI is an innovative artificial intelligence platform that is revolutionizing the decentralized finance (DeFi) industry.",
    desc: "By combining the benefits of DeFi, such as decentralization and accessibility, with the capabilities of AI, DeFi AI aims to provide a new level of financial services, including asset management, lending, borrowing, and trading.",
  },
  {
    icon: <HomeZenChatAi />,
    title: "ZEN Chat.AI",
    subtitle: "The Future of AI-Powered Conversations",
    desc: "Zen ChatAI is a multi-platform AI-powered chatbot that can be used on Telegram, Discord, and as a Google Chrome extension.  It uses advanced natural language processing and machine learning algorithms to understand and respond to user requests in real-time.",
  },
  {
    icon: <HomeZenArtAi />,
    title: "ZEN Art.AI",
    subtitle: "The Future of AI-Generated Art",
    desc: "Utilizing state-of-the-art generative algorithms, Zen ArtAI can create everything from portraits and landscapes to abstract and surreal compositions. The platform also provides a collaborative environment for artists, where they can work with the AI to produce truly one-of-a-kind pieces.",
  },
];

export const homeZenArtGalleryContent: Array<PropsHomeZenArtGalleryCard> = [
  {
    image: HomeZenArtGalleryBanner1,
    desc: `"Founders Sunny Bonnell and Ashleigh Hansberger are bestselling authors..."`,
    tag: "(TALK AT INC.)",
  },
  {
    image: HomeZenArtGalleryBanner2,
    desc: `"Founders Sunny Bonnell and Ashleigh Hansberger are bestselling authors..."`,
    tag: "(TALK AT INC.)",
  },
  {
    image: HomeZenArtGalleryBanner3,
    desc: `"Founders Sunny Bonnell and Ashleigh Hansberger are bestselling authors..."`,
    tag: "(TALK AT INC.)",
  },
];

export const homeZenVerifyAiContent: Array<PropsHomeZenVerifyAiCard> = [
  {
    image: HomeZenVerifyAiBanner1,
    title: "Verify.AI scans and analyzes\n Project information",
  },
  {
    image: HomeZenVerifyAiBanner2,
    title: "Comparing it to vast databases of authorized and\n verified sources to ensure its authenticity",
  },
  {
    image: HomeZenVerifyAiBanner3,
    title: "Scan and examine smart contract\n code",
  },
  {
    image: HomeZenVerifyAiBanner4,
    title:
      "Filtering out harmful functions and vulnerabilities to ensure the security and integrity of the underlying code.",
  },
];

export const homeZenDefiAiContent: Array<PropsHomeZenDefiAiCard> = [
  {
    image: HomeZenDefiAiBanner1,
    title: "Automated portfolio management",
    tag: "Branding",
    colorTag: "#87a3bf",
  },
  {
    image: HomeZenDefiAiBanner2,
    title: "Automated risk management",
    tag: "Branding",
    colorTag: "#ededaa",
  },
  {
    image: HomeZenDefiAiBanner3,
    title: "Automated investments",
    tag: "Branding",
    colorTag: "#b9d6a7",
  },
];
