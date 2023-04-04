import React from "react";
export default function DatePost({ date }) {
  const now = new Date();
  let time = "seconds";
  const postDate = new Date(date);
  let timeFromCreate = now - postDate;
  timeFromCreate = Math.floor(timeFromCreate / 1000);

  if (timeFromCreate > 60 && time === "seconds") {
    timeFromCreate = Math.floor(timeFromCreate / 60);
    time = "minute";
  }

  if (timeFromCreate > 60 && time === "minute") {
    timeFromCreate = Math.floor(timeFromCreate / 60);
    time = "hour";
  }

  if (timeFromCreate > 24 && time === "hours") {
    timeFromCreate = Math.floor(timeFromCreate / 60);
    time = "day";
  }
  return (
    <div>
      {timeFromCreate}
      {`  ${time} ago`}{" "}
    </div>
  );
}
