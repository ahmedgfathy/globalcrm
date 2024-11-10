// App.js
import React from "react";
import LoadDetails from "./LeadDetails";
import SheetCalls from "./SheetsCalls";
import CollapsibleComponent from "../CollapsibleComponent";
import "./style.css";

const App = ({ page }) => {
  const items = [
    {
      key: "1",
      label: "Lead Details",
      children: <LoadDetails page={page} />,
    },
    {
      key: "2",
      label: "Sheets Calls",
      children: <SheetCalls page={page} />,
    },
  ];

  return <CollapsibleComponent items={items} />;
};

export default App;
