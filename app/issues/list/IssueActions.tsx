import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueFilterStatus from "./IssueFilterStatus";

const IssueActions = () => {
  return (
    <Flex justify="between" mb="5">
      <IssueFilterStatus />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
