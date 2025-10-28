import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";

const IssuePage = () => {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Theme</Text>
      <Button>New Issue</Button>
    </Flex>
  );
};

export default IssuePage;
