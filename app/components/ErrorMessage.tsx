import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text className="text-red-600 text-sm" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
