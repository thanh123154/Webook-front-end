import {
  Button,
  Center,
  Container,
  Group,
  Loader,
  Stepper,
  Title,
} from "@mantine/core";
import React, { useState } from "react";

import { Step1 } from "./component/Step1";
import { Step2 } from "./component/Step2";
import { Step3 } from "./component/Step3";
import { Step4 } from "./component/Step4";

export const CreateListing = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container py={50} size={1440} px={{ base: "20px", sm: "20px" }}>
      {" "}
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Your idea">
          <Step1 sth="hello" />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Experience">
          <Step2 sth="test2" />
        </Stepper.Step>

        <Stepper.Step label="Step3" description="Guest pricing">
          <Step3 sth="test3" />
        </Stepper.Step>

        <Stepper.Step label="Step4" description="Address">
          <Step4 sth="test4" />
        </Stepper.Step>

        <Stepper.Completed>
          <Center mt={100}>
            {" "}
            <Group>
              {" "}
              <Title>
                Completed , Please wait for your residence to be approved
              </Title>{" "}
              <Loader />
            </Group>
          </Center>
        </Stepper.Completed>
      </Stepper>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        {active < 4 ? <Button onClick={nextStep}>Next step</Button> : ""}
      </Group>
    </Container>
  );
};
