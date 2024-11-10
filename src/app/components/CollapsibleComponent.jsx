"use client";

import React, { useState } from "react";
import { Collapse } from "antd";

const CollapsibleComponent = ({ items }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const updatedItems = items.map((item) => ({
    ...item,
    children: React.cloneElement(item.children, {
      isDisabled,
      setIsDisabled,
    }),
  }));

  return (
    <div>
      <Collapse
        className="dark:bg-red-50"
        items={updatedItems}
        defaultActiveKey={["1"]}
      />
    </div>
  );
};

export default CollapsibleComponent;