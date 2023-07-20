import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import "./App.css";

import Detail from "./components/Detail";
// api ข้อมูลสภาพอากาศ
const url_weather = "https://api.openweathermap.org/data/2.5/";
// key ของ weather
const key_weather = "963eaf3af407b3d85edcd9554e989b93";
// key ของ onecall
const key_onecall = "c0d290eeee9dd399b017a6d2ba64be7e";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [str_city, setStr_city] = useState("");
  const [city, setCity] = useState("");
  const [dataWTLatLon, setDataWTLatLon] = useState({});
  const [dataonecall, setDataOnecall] = useState({});
  const [statusloadApi, setStatusloadApi] = useState(false);

  // ฟังก์ชันเพื่อรับค่าละติจูดและลองจิจูดจาก onClick event
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
      setStr_city("");
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // หาข้อมูลสภาพอากาศตาม lat lon ที่ set useState มาจากปุ่ม You Location Weather
  useEffect(() => {
    // signal abortController เพื่อยกเลิกการเรียก API
    let abortController = new AbortController();
    const url_api_weather =
      url_weather +
      "weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      key_weather +
      "&units=imperial";

    const url_api_onecall =
      url_weather +
      "onecall?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&exclude=hourly,minutely&units=metric&appid=" +
      key_onecall;
    const loadweather_api = async () => {
      setStatusloadApi(true);
      await axios
        .get(url_api_weather, {
          signal: abortController.signal,
        })
        .then((response) => {
          // ดำเนินการกับข้อมูลที่ได้รับจากเรียก API ได้ที่นี่
          setDataWTLatLon(response.data);
          loadweather_onecall();
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดที่เกิดขึ้นในการเรียก API ได้ที่นี่
          console.log(error);
          setStatusloadApi(false);
        });
    };

    const loadweather_onecall = async () => {
      await axios
        .get(url_api_onecall, {
          signal: abortController.signal,
        })
        .then((response_onecall) => {
          // ดำเนินการกับข้อมูลที่ได้รับจากเรียก API ได้ที่นี่
          setDataOnecall(response_onecall.data);
          setStatusloadApi(false);
        })
        .catch((error_onecall) => {
          // จัดการข้อผิดพลาดที่เกิดขึ้นในการเรียก API ได้ที่นี่
          console.log(error_onecall);
          setStatusloadApi(false);
        });
    };

    if (latitude !== "" && longitude !== "") {
      loadweather_api();
    }

    return () => abortController.abort();
  }, [latitude, longitude]);

  useEffect(() => {
    // signal abortController เพื่อยกเลิกการเรียก API
    let abortController = new AbortController();
    // api ของ หา Latt Longt ตามชื่อจังหวัด
    const url_api_weather_city =
      url_weather + "weather?q=" + city + "&unit=metric&appid=" + key_weather;

    const loaddata_lat_lon = async () => {
      await axios
        .get(url_api_weather_city, {
          signal: abortController.signal,
        })
        .then((response_geocode) => {
          // ดำเนินการกับข้อมูลที่ได้รับจากเรียก API ได้ที่นี่
          setLatitude(response_geocode.data.coord.lat);
          setLongitude(response_geocode.data.coord.lon);
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดที่เกิดขึ้นในการเรียก API ได้ที่นี่
          console.log(error);
        });
    };
    if (city !== "") {
      loaddata_lat_lon();
    }
    return () => abortController.abort();
  }, [city]);

  if (statusloadApi) {
    return (
      <div>
        <Navbar
          handleLocation={handleLocation}
          setCity={setCity}
          str_city={str_city}
          setStr_city={setStr_city}
        />
        <div className='w-full h-96 flex justify-center items-center'>
          <div className="loader"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar
        handleLocation={handleLocation}
        setCity={setCity}
        str_city={str_city}
        setStr_city={setStr_city}
      />

      {Object.keys(dataWTLatLon).length !== 0 ? (
        <Detail
          dataWTLatLon={dataWTLatLon}
          dataonecall={dataonecall}
          handleLocation={handleLocation}
        />
      ) : null}
    </div>
  );
}

export default App;
