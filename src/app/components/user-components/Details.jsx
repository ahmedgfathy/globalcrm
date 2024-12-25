import React, {useEffect, useState} from "react";
import LoadDetails from "./LeadDetails";
import SheetCalls from "./SheetsCalls";
import CollapsibleComponent from "../CollapsibleComponent";
import "./style.css";
import { getAllSettings } from "@/actions/filterSettings";

const App = ({ page, handleChange,handleSubmit, title, lead, handleImageChange, image, setImage,imageFile, setImageFile, handleDeleteImage, actionIcons,key }) => {
  const [options, setOptions] = useState("")
  useEffect(()=>{
    const fetchOptions = async ()=>{
      const res = await getAllSettings()
      setOptions(JSON.parse(res[0].leadSettings))
    }
    fetchOptions()
    // console.log(options)
  }, [key])
  const items = [
    {
      key: "1",
      label: "Lead Details",
      children: <LoadDetails
      options={options}
       page={page} 
       handleSubmit={handleSubmit} 
       handleDeleteImage={handleDeleteImage}
       handleChange={handleChange} 
       title={title} 
       lead={lead} 
       handleImageChange={handleImageChange}
       image={image}
       setImage={setImage}
       imageFile={imageFile}
       setImageFile={setImageFile}
       actionIcons={actionIcons} // Pass actionIcons to LeadDetails
       />,
    },
    {
      key: "2",
      label: "Sheets Calls",
      children: <SheetCalls page={page} handleChange={handleChange} lead={lead} options={options}/>,
    },
  ];

  return <CollapsibleComponent items={items}  />;
};

export default App;
