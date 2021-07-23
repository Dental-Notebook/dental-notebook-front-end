import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const Earnings = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [lastMonthEarnings, setLastMonthEarnings] = useState(0);
  const [earningsByDate, setEarningsBydate] = useState([]);

  React.useEffect(() => {
    fetchTotalEarnings();
    fetchLastMonthEarnings();
    fetchEarningsByDate();
  }, []);

  function fetchTotalEarnings() {
    axios
      .get("/earnings")
      .then(function (response) {
        setTotalEarnings(response.data.total_earnings);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  function fetchLastMonthEarnings() {
    axios
      .get("/earnings/last-month")
      .then(function (response) {
        setLastMonthEarnings(response.data.total_earnings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function fetchEarningsByDate() {
    axios
      .get("/earnings/earnings-by-date")
      .then(function (response) {
        setEarningsBydate(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Total Earnings</h1>
      <p>{totalEarnings}</p>
      <h1>Month Earnings</h1>
      <p>{lastMonthEarnings}</p>
      <h1>Earnings By Date</h1>
      <div>
        {earningsByDate.length >= 1 &&
          earningsByDate.map(function (earn, index) {
            if (index === 0) {
              return (
                <div key={index}>
                  <h1>{moment(earn.appointment_date).format("MMM Do YY")}</h1>
                  <p>
                    {earn.name} {earn.treatments_earnings}
                  </p>
                </div>
              );
            } else if (
              moment(earn.appointment_date).format("MMM Do YY") !==
              moment(earningsByDate[index - 1].appointment_date).format(
                "MMM Do YY"
              )
            ) {
              return (
                <div key={index}>
                  <h1>{moment(earn.appointment_date).format("MMM Do YY")}</h1>
                  <p>
                    {earn.name} {earn.treatments_earnings}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <p>
                    {earn.name} {earn.treatments_earnings}
                  </p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Earnings;
