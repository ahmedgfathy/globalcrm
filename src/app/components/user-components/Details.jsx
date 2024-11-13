import React from "react";
import LoadDetails from "./LeadDetails";
import SheetCalls from "./SheetsCalls";
import CollapsibleComponent from "../CollapsibleComponent";
import "./style.css";

const App = ({ page, handleChange,handleSubmit, title }) => {
  const items = [
    {
      key: "1",
      label: "Lead Details",
      children: <LoadDetails page={page} handleSubmit={handleSubmit} handleChange={handleChange} title={title} />,
    },
    {
      key: "2",
      label: "Sheets Calls",
      children: <SheetCalls page={page} handleChange={handleChange} />,
    },
  ];

  return <CollapsibleComponent items={items} />;
};

export default App;
