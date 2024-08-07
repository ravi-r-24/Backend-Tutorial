import React from "react";
import { useEffect } from "react";
import axios from "axios";
import TwoLinerCard from "./Two_Liner_Card";

const TwoLiner = () => {
  const [twoLiner, setTwoLiner] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/two-liner")
      .then((response) => {
        setTwoLiner(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="px-8 w-full h-auto">
      {console.log(twoLiner)}
      {twoLiner.map((twoLiner) => (
        <TwoLinerCard
          key={twoLiner.id}
          text={twoLiner.text}
          writer={twoLiner.writer}
        />
      ))}
    </div>
  );
};

export default TwoLiner;
