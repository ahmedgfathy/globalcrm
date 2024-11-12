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
      <Collapse
        className="dark:border-transparent overflow-hidden"
        items={updatedItems}
        defaultActiveKey={["1"]}
      />

      {updatedItems.map((item) => (
        <div key={item.key}>{item.children}</div>
      ))}
    </div>
  );
};

export default CollapsibleComponent;
