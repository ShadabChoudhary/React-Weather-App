import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [city, setCity] = useState(null);
  const [realTime, setRealTime] = useState({});
  const [forcast, setForcast] = useState({});

  const [search, setSearch] = useState("Mumbai");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const searchFun = async () => {
    try {
      const realtimeUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${search}&apikey=PV0Aed7qz7CNrVFqxPuSNpNa8LY9tx55`;
      const forcastUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${search}&apikey=PV0Aed7qz7CNrVFqxPuSNpNa8LY9tx55`;

      const realRes = await fetch(realtimeUrl);
      const forRed = await fetch(forcastUrl);

      //converint the data into JSON form
      const realJson = await realRes.json();
      const forJson = await forRed.json();

      setForcast(() => forJson);
      setRealTime(() => realJson);
      setCity(() => search);
    } catch (error) {
      //error
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    //fragmentation
    <>
      <div className="app-wrap">
        <div className="inout-Field">
          <input
            type="text"
            className="search-box"
            autoComplete="off"
            placeholder="Search for a city..."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />

          <button className="btn" onClick={searchFun}>
            Search
          </button>
        </div>

        {realTime?.code || forcast?.code ? (
          <p>NO Data Found</p>
        ) : (
          <div className="info">
            <div className="location">
              <div className="city">{search}</div>
              {/* <div class="date">Thursday 10 January 2020</div> */}
            </div>
            <div className="current">
              <div className="temp">
                {realTime?.data?.values?.temperature
                  ? realTime?.data?.values?.temperature
                  : 0}
                <span>℃</span>
              </div>
            </div>
            <div className="forecast">
              {forcast?.timelines?.daily ? (
                <table>
                  <thead>
                    <tr>
                      {forcast?.timelines?.daily.map((e, i) => (
                        <th key={i}>{days[new Date(e?.time).getDay()]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {forcast?.timelines?.daily.map((e, i) => (
                        <th key={i}>{e?.values?.temperatureApparentAvg}℃</th>
                      ))}
                    </tr>
                  </tbody>
                </table>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
