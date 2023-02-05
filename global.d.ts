declare module "*.woff2" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "framer-motion" {
  export * from "framer-motion/dist/index";
}
