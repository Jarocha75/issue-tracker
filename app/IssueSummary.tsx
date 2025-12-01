import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "In Progress issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4" justify="center">
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction="column" align="center" gap="2">
            <Link
              className="text-sm font-medium"
              href={`/issues/?status=${status.status}`}
            >
              {status.label}
            </Link>
            <Text size="4" className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
