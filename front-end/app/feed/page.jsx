import React from "react";

import CreateProject from "../components/CreateProject";
import Nav from "../components/Nav";
import Updates from "../components/Updates";
import ProjectSummary from "../components/ProjectSummary";

export default async function page() {
  function formatDate(date) {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <>
      <Nav />
      <div className=" h-full pl-[330px] max-w-[1280px] pt-10  text-neutral font-poppins">
        <div className="grid   h-full pt-11 gap-4 ">
          <p className="text-2xl font-semibold">
            Today{" "}
            <span className="text-sm font-normal opacity-50">
              {formatDate(new Date())}
            </span>
          </p>
          <Updates />
          <div className=" grid grid-cols-3 ">
            <ProjectSummary />
            <ProjectSummary />
            <CreateProject />
          </div>
        </div>
      </div>
    </>
  );
}
