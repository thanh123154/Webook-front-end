import { Box, type Sx } from "@mantine/core";
import { motion, useAnimation } from "framer-motion";
import { type ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  delayTime: number;
  duration: number;
  startPoint: number;
  endPoint: number;
  height?: string;
};

export const TextAnimation: React.FC<Props> = ({ children, delayTime, duration, startPoint, endPoint, height }) => {
  const animation = useAnimation();

  useEffect(() => {
    void animation.start({
      bottom: [startPoint, endPoint],
      transition: { duration: duration, delay: delayTime },
    });
  }, [animation, delayTime, duration, endPoint, startPoint]);

  return (
    <Box sx={container} style={{ height: height }} className="containerTextAnimation">
      <div style={{ opacity: "0", width: "fit-content" }}>{children}</div>
      <motion.div animate={animation} style={{ position: "absolute", bottom: 0 }}>
        {children}
      </motion.div>
    </Box>
  );
};

const container: Sx = {
  position: "relative",

  overflow: "hidden",
};
