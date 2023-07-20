import React, { useState, useEffect, useRef } from "react";

function Modaldetail({ indexDiv8, SetStatusModal, data }) {
  const modalRef = useRef();
  const [datadt, setDataDt] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [felttemp, setFeltTemp] = useState(0);
  console.log(data[indexDiv8]);
  useEffect(() => {
    setDataDt(data[indexDiv8].dt);
    dateFormat();
  }, [datadt]);

  // แปลง อุณหภูมิ จาก F เป็น C
  useEffect(() => {
    const newFahrenheit_felttemp = parseFloat(data[indexDiv8].feels_like.day);
    const newCelsius_felttemp = convertFahrenheitToCelsius(
      newFahrenheit_felttemp
    );
    setFeltTemp(newCelsius_felttemp.toFixed(2));
  }, []);

  const closeModal = () => {
    SetStatusModal(false);
  };

  const handleClickOutsideModal = (event) => {
    //ตรวจสอบการกดนอก Div
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const dateFormat = () => {
    const milliseconds = datadt * 1000;

    let myDate = new Date(milliseconds);
    let date = myDate.toLocaleString("en-GB").split(",")[0];
    let day = myDate.toLocaleString("en-US", { weekday: "long" });

    setDate(date);
    setDay(day);
  };

  const convertFahrenheitToCelsius = (fahrenheit) => {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return celsius;
  };

  const title = useState([
    "Felt Temp.",
    "Humidity",
    "Wind",
    "Pressure",
    "Day Temp.",
    "Evening Temp.",
    "Night Temp.",
    "Max Temp.",
    "Min Temp.",
  ]);

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none text-blue-600"
        onClick={handleClickOutsideModal} // เพิ่ม event listener สำหรับคลิกที่พื้นหลัง
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl" ref={modalRef}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-center p-3 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                {day} ({date})
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-3 sm:p-7 flex-auto grid grid-cols-2 text-md">
              <div className="mr-10 sm:mr-16">
                {title[0].map((v, i) => (
                  <div key={i} className="mt-5 md:mt-4">
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-blue-600 text-white rounded-xl pb-4 pl-5 sm:pl-10">
                <div className="mt-5 md:mt-4">
                  {data[indexDiv8].feels_like.day.toFixed(2)}
                  <span className="span_o_ri text-sm">o</span>C
                </div>
                <div className="mt-5 md:mt-4">{data[indexDiv8].humidity}%</div>
                <div className="mt-5 md:mt-4">
                  {(data[indexDiv8].wind_speed * 3.6).toFixed(2)} Km/h
                </div>
                <div className="mt-5 md:mt-4">
                  {data[indexDiv8].pressure} hPa
                </div>
                <div className="mt-5 md:mt-4">{data[indexDiv8].temp.day}</div>
                <div className="mt-5 md:mt-4">
                  {data[indexDiv8].temp.eve}{" "}
                  <span className="span_o_ri text-sm">o</span>C
                </div>
                <div className="mt-5 md:mt-4">
                  {data[indexDiv8].temp.night}{" "}
                  <span className="span_o_ri text-sm">o</span>C
                </div>
                <div className="mt-5 md:mt-4">
                  {data[indexDiv8].temp.min}{" "}
                  <span className="span_o_ri text-sm">o</span>C
                </div>
                <div className="mt-5 md:mt-4">
                  {data[indexDiv8].temp.max}{" "}
                  <span className="span_o_ri text-sm">o</span>C
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-1 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal} // เพิ่ม event listener สำหรับปุ่มปิด
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black"
        onClick={handleClickOutsideModal} // เพิ่ม event listener สำหรับคลิกที่พื้นหลัง
      ></div>
    </>
  );
}

export default Modaldetail;
