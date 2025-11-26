"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<User[]>("/api/users");
      return data;
    },
    staleTime: 1 * 60 * 1000, // 1 minutes
    retry: 3,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "unassigned"}
      onValueChange={(value) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: value === "unassigned" ? null : value,
        });
      }}
    >
      <Select.Trigger placeholder="Select Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
