import React, { useState, useEffect } from "react";

function Day8H({ index, data}) {
  const [datadt, setDataDt] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    setDataDt(data[index].dt);
    dateFormat();
  }, [datadt]);

  const dateFormat = () => {
    const milliseconds = datadt * 1000;

    let myDate = new Date(milliseconds);
    let date = myDate.toLocaleString("en-GB").split(",")[0];
    let day = myDate.toLocaleString("en-US", { weekday: "long" });

    setDate(date);
    setDay(day);
  };
  // 
  return (
    <div className="div-date p-3 bg-blue-600 text-white">
      <div className="text-xl">{day}</div>
      <div>{date}</div>
    </div>
  );
}

export default Day8H;
