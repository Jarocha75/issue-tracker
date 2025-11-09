import { IssueStatusBadge } from "@/app/components";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMardown from "react-markdown";
import React from "react";
import { Issue } from "@prisma/client";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" align="center" my="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMardown>{issue.description}</ReactMardown>
      </Card>
    </>
  );
};

export default IssueDetails;
