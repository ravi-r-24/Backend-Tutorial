import React from "react";

const TwoLinerCard = ({ text, writer }) => {
  return (
    <div className="w-full p-4 flex border-b border-b-slate-200">
      <div className="w-4/5">
        <div className="text-slate-900 font-devnagri font-bold text-lg">
          {text}
        </div>
      </div>
      <div className="w-1/5 flex items-end justify-end text-slate-600 font-semibold text-lg font-devnagri">
        {writer}
      </div>
    </div>
  );
};

export default TwoLinerCard;
