import { prisma } from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Table,
  Link as RadixLink,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssue = async () => {
  const issue = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="3" as="h2" mb="4">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issue.map((iss) => (
            <Table.Row key={iss.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <RadixLink asChild>
                      <Link href={`/issues/${iss.id}`}>{iss.title}</Link>
                    </RadixLink>
                    <IssueStatusBadge status={iss.status} />
                  </Flex>
                  {iss.assignedToUser && (
                    <Avatar
                      fallback={
                        iss.assignedToUser.name?.charAt(0).toUpperCase() || "?"
                      }
                      variant="solid"
                      color="indigo"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
