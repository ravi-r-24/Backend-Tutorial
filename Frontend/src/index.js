import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import TwoLiner from "./Components/Two_Liner";

const Index = () => {
  return (
    <div className="text-red-800">
      <TwoLiner />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
