import React from "react";
import "./TrendCard.css";
import { Trend } from "../../Data/TrendData";

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends for you</h3>

      {Trend.map((trend) => {
        return (
          <div className="trend">
            <span>#{trend.name}</span>
            <span>{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
