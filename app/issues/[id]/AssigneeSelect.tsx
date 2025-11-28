"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [value, setValue] = useState(issue.assignedToUserId || "unassigned");

  const { data: users, error, isLoading } = useUsers();

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  const assignIssue = async (newValue: string) => {
    const previous = value;
    setValue(newValue);

    try {
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: newValue === "unassigned" ? null : newValue,
      });
    } catch (error) {
      toast.error("Change could not be saved");
      setValue(previous);
    }
  };

  return (
    <>
      <Select.Root value={value} onValueChange={assignIssue}>
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
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get<User[]>("/api/users");
      return data;
    },
    staleTime: 1 * 60 * 1000, // 1 minutes
    retry: 3,
  });

export default AssigneeSelect;
