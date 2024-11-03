import { Button } from "@/components/ui/button";
import React from "react";

function Page() {
  return (
    <div className="dashboard">
      <div className="container mx-auto">
        <div className="card w-full bg-dark flex justify-between items-center min-h-[300px] rounded-md text-white">
          <div className="px-6 min-h-full">
            <div className="title flex flex-col min-h-full justify-evenly">
              <div className="head">
                <h1>
                  أهلا بعوتك <span></span> Admin{" "}
                </h1>
              </div>
              <div className="desc">
                <h3>
                  برنامج إدارة المهام المتكامل لمتابعة و ضبط الدوام والمهام
                </h3>
              </div>
              <div className="btn">
                <Button>الذهاب الي قسم المهام</Button>
              </div>
            </div>
            <div className="image"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
