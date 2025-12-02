"use client";

import React from "react";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueCharts = ({ open, closed, inProgress }: Props) => {
  const data = [
    { name: "Open", value: open },
    { name: "In Progress", value: inProgress },
    { name: "Closed", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" barSize={60} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueCharts;
