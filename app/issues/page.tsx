import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./list/IssueActions";
import IssueTable, { IssueQuery } from "./list/IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status =
    searchParams.status !== "all" && statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;
  const where = { status };

  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: {
      [searchParams.orderBy ?? "createdAt"]: "asc",
    },
    skip: skip,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4" p="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuePage;
