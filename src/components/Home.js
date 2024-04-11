import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [city, setCity] = useState(null);
  const [realTime, setRealTime] = useState({});
  const [forcast, setForcast] = useState({});
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("Mumbai");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  //fetching the data from API
  const searchFun = async () => {
    try {
      setLoading(true);
      const realtimeUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${search}&apikey=PV0Aed7qz7CNrVFqxPuSNpNa8LY9tx55`;
      const forcastUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${search}&apikey=PV0Aed7qz7CNrVFqxPuSNpNa8LY9tx55`;

      const realRes = await fetch(realtimeUrl);
      const forRed = await fetch(forcastUrl);

      //converint the data into JSON form
      const realJson = await realRes.json();
      const forJson = await forRed.json();

      console.log(realJson, forJson);

      setForcast(() => forJson);
      setRealTime(() => realJson);
      setCity(() => search);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      //error
      console.log(error);
      alert("Something went wrong");
    }
  };

  return loading ? (
    <div className="loader">LOADING...</div>
  ) : (
    <>
      <div className="app-wrap">
        <div className="input-field">
          <input
            type="text"
            className="search-box"
            autoComplete="off"
            placeholder="Search for a city..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <button className="btn" onClick={searchFun}>
            Search
          </button>
        </div>

        {/* if we did not get the city we enter then simply return thr erroe messge */}
        {realTime?.code || forcast?.code ? (
          <p className="error-msg">No Data Found</p>
        ) : (
          <div className="info">
            <div className="location">
              <div className="city" text-align="center">
                {search}
              </div>
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
                        // console.log(e),
                        // console.log(new Date(e?.time).getDay()),
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
