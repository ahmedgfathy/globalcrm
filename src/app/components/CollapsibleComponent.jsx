// "use client";

// import React, { useState } from "react";

// const CollapsibleComponent = ({ items }) => {
//   const [isDisabled, setIsDisabled] = useState(true);

//   const updatedItems = items.map((item) => ({
//     ...item,
//     children: React.cloneElement(item.children, {
//       isDisabled,
//       setIsDisabled,
//     }),
//   }));

//   return (
//     <div>
//       <updatedItems.children />
//     </div>
//   );
// };

// export default CollapsibleComponent;


"use client";

import React, { useState } from "react";

const CollapsibleComponent = ({ items }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const updatedItems = items.map((item, index) => ({
    ...item,
    children: React.cloneElement(item.children, {
      isDisabled,
      setIsDisabled,
    }),
    key: index,
  }));

  return (
    <div>
      {updatedItems.map((item) => (
        <div className="pb-4" key={item.key}>{item.children}</div>
      ))}
    </div>
  );
};

export default CollapsibleComponent;

