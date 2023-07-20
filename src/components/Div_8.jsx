import React , { useState , useEffect} from "react";
import { ImSun } from "react-icons/im";
import { MdOutlineNightsStay } from "react-icons/md";
import Day8H from "./Day8H";

function Div_8({ index, item, data, setIndexDiv8, SetStatusModal}) {

  return (
    <div className="h-auto max-w-full rounded-lg div-name-7 cursor-pointer zoom" onClick={() => {setIndexDiv8(index);SetStatusModal(true);}}>
      <div className="mb-3">
        <Day8H index={index} data={data} />
      </div>
      <div className="flex justify-center">
        <ImSun size={32} className="text-amber-500 m-1" />
        <p className="m-1 ml-2 text-3xl">
          {Math.round(item.temp.day)}
          <span className="span_xl text-base">o</span>
          <span className="ml-2">C</span>
        </p>
      </div>
      <div className="flex justify-center mb-3">
        <MdOutlineNightsStay size={32} className="text-blue-600 m-1" />
        <p className="m-1 ml-2 text-3xl">
          {Math.round(item.temp.night)}
          <span className="span_xl text-base">o</span>
          <span className="ml-2">C</span>
        </p>
      </div>
    </div>
  );
}

export default Div_8;
