import React, { useState, useEffect } from "react";
import "../assets/detail.css";
import { FaSyncAlt } from "react-icons/fa";
import Div_8 from "./Div_8";
import Modaldetail from "./Modaldetail";

function Detail({ dataWTLatLon, dataonecall, handleLocation }) {
  const [data, setData] = useState([]);
  const [celsius, setCelsius] = useState(0);
  const [felttemp, setFeltTemp] = useState(0);
  const [temp_max, setTemp_max] = useState(0);
  const [temp_min, setTemp_min] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [statusmodal, SetStatusModal] = useState(false);
  const [indexDiv8, setIndexDiv8] = useState(0);

  const title = useState([
    "Felt Temp.",
    "Humidity",
    "Wind",
    "Visibility",
    "Max Temp.",
    "Min Temp.",
  ]);

  const handleIconClick = () => {
    handleLocation();
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 4000); // ระยะเวลา 4 วินาที (2 รอบ) ก่อนหยุดการหมุน
  };

  // แปลง อุณหภูมิ จาก F เป็น C
  useEffect(() => {
    const newFahrenheit = parseFloat(dataWTLatLon.main.temp);
    const newCelsius = Math.ceil(convertFahrenheitToCelsius(newFahrenheit));
    setCelsius(newCelsius);

    const newFahrenheit_felttemp = parseFloat(dataWTLatLon.main.feels_like);
    const newCelsius_felttemp = convertFahrenheitToCelsius(
      newFahrenheit_felttemp
    );
    setFeltTemp(newCelsius_felttemp.toFixed(2));

    const newFahrenheit_temp_max = parseFloat(dataWTLatLon.main.temp_max);
    const newCelsius_temp_max = convertFahrenheitToCelsius(
      newFahrenheit_temp_max
    );
    setTemp_max(newCelsius_temp_max.toFixed(2));

    const newFahrenheit_temp_min = parseFloat(dataWTLatLon.main.temp_min);
    const newCelsius_temp_min = convertFahrenheitToCelsius(
      newFahrenheit_temp_min
    );
    setTemp_min(newCelsius_temp_min.toFixed(2));
  }, []);

  useEffect(() => {
    setData(dataonecall.daily);
  }, [dataonecall.daily]);

  const convertFahrenheitToCelsius = (fahrenheit) => {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return celsius;
  };

  return (
    <>
      <section>
        <div className="text-center div-top gap-5 text-blue-600 font-bold flex justify-center flex-wrap">
          <div className="div-name w-full lg:w-4/12 md:w-5/12 sm:w-5/12 zoom">
            <div className="m-5 mb-2 flex justify-end cursor-pointer text-2xl">
              <FaSyncAlt
                className={isRotating ? "rotate" : ""}
                onClick={handleIconClick}
              />
            </div>
            <div className="text-3xl">
              <h2>{dataWTLatLon.name}</h2>
            </div>
            <div className="mt-3 mb-3">
              <span className="text-8xl">{celsius}</span>
              <span className="span_o text-6xl">o</span>
              <span className="text-8xl">C</span>
            </div>
            <div className="text-3xl">
              <p>{dataWTLatLon.weather[0].main}</p>
            </div>
          </div>
          <div className="div-name w-full lg:w-4/12 md:w-5/12 sm:w-5/12 flex text-md md:text-xl zoom">
            <div className="w-full lg:w-5/12 md:w-5/12 sm:w-5/12 pt-2">
              {title[0].map((v, i) => (
                <div key={i} className="mt-5 md:mt-4">
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-7/12 md:w-7/12 sm:w-7/12 pt-2 bg-blue-600 text-white">
              <div className="mt-5 md:mt-4">
                {felttemp}
                <span className="span_o_ri text-sm">o</span>C
              </div>
              <div className="mt-5 md:mt-4">{dataWTLatLon.main.humidity}%</div>
              <div className="mt-5 md:mt-4">
                {(dataWTLatLon.wind.speed * 3.6).toFixed(2)} Km/h
              </div>
              <div className="mt-5 md:mt-4">
                {(dataWTLatLon.visibility * 0.001).toFixed(2)} Km
              </div>
              <div className="mt-5 md:mt-4">
                {temp_max}
                <span className="span_o_ri text-sm">o</span>C
              </div>
              <div className="mt-5 md:mt-4">
                {temp_min}
                <span className="span_o_ri text-sm">o</span>C
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 2xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-5 pl-3 pr-3 md:pl-5 md:pr-5 mb-5">
            {data
              ? data.map((item, index) => (
                  <Div_8
                    index={index}
                    item={item}
                    data={data}
                    key={index}
                    setIndexDiv8 ={setIndexDiv8}
                    SetStatusModal = {SetStatusModal}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      {statusmodal ? (
        <Modaldetail
          indexDiv8={indexDiv8}
          SetStatusModal={SetStatusModal}
          data={data}
        />
      ) : null}
    </>
  );
}

export default Detail;
