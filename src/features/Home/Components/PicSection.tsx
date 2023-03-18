import { AspectRatio, Flex } from "@mantine/core";
import Image, { type StaticImageData } from "next/image";

import React from "react";
import { Pic1 } from "../../../assets/imgs";

type Props = {
  dataPic?: Array<StaticImageData>;
};

export const PicSection: React.FC<Props> = ({ dataPic }) => {
  return (
    <Flex gap={24}>
      <AspectRatio
        sx={{
          img: {
            borderRadius: "16px",
          },
        }}
        w={792}
        ratio={1.39}
      >
        <Image src={Pic1} alt="" fill />
      </AspectRatio>

      <Flex direction={"column"} gap={24}>
        {" "}
        <AspectRatio
          sx={{
            img: {
              borderRadius: "16px",
            },
          }}
          w={384}
          ratio={1.4}
        >
          <Image src={Pic1} alt="" fill />
        </AspectRatio>
        <AspectRatio
          sx={{
            img: {
              borderRadius: "16px",
            },
          }}
          w={384}
          ratio={1.4}
        >
          <Image src={Pic1} alt="" fill />
        </AspectRatio>
      </Flex>
    </Flex>
  );
};
