"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import LoadDetails from "./LeadDetails";
import SheetCalls from "./SheetsCalls";
import "./style.css"



const App = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const items = [
    {
      key: "1",
      label: "Lead Details",
      children: <LoadDetails isDisabled={isDisabled} setIsDisabled={setIsDisabled} />,
    },
    {
      key: "2",
      label: "Sheets Calls",
      children: <SheetCalls isDisabled={isDisabled} setIsDisabled={setIsDisabled} />,
    },
  ];
  return (
    <Collapse
      className={`dark:bg-red-50`}
      items={items}
      defaultActiveKey={["1"]}
    />
  );
};

export default App;
