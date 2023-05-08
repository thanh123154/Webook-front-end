import { Carousel } from "@mantine/carousel";
import { AspectRatio, Button, Flex, Modal } from "@mantine/core";
import { nanoid } from "nanoid";
import Image from "next/image";

import React, { useState } from "react";

type Props = {
  dataPic?: string;
};

export const PicSection: React.FC<Props> = ({ dataPic }) => {
  const [arrayPic, setArrayPic] = useState<string[]>([]);
  const [opened, setOpened] = useState(false);

  React.useEffect(() => {
    dataPic && setArrayPic(JSON.parse(dataPic) as string[]);
  }, [dataPic]);
  // console.log(arrayPic, "pic");
  return (
    <Flex gap={24} pos="relative">
      <AspectRatio
        sx={{
          img: {
            borderRadius: "16px",
          },
        }}
        w={792}
        ratio={1.39}
      >
        <Image src={arrayPic[2] || ""} alt="" fill />
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
          <Image src={arrayPic[1] || ""} alt="" fill />
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
          <Image src={arrayPic[0] || ""} alt="" fill />
        </AspectRatio>
      </Flex>

      <Button
        pos="absolute"
        bottom={20}
        right={20}
        onClick={() => setOpened(true)}
      >
        View Alls
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        size="80vw"
      >
        <Carousel>
          {arrayPic.map((item) => (
            <Carousel.Slide key={nanoid()}>
              <AspectRatio ratio={2} w="100%">
                <Image src={item} alt="" fill />
              </AspectRatio>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>
    </Flex>
  );
};
