import React from "react";

function page({ params }) {
  return (
    <div className="page-user">
      <div className="container mx-auto">
        <h1> This Page Details User : {params?.id}</h1>
      </div>
    </div>
  );
}

export default page;
