import React from "react";
import "./styles.css";

const Card = ({ name, desc, tags = [], topics=[], time}) => {
  return (
    <div className="card-container">
      <span className="card-time">{time}</span>
      <h4 className="card-title">
        {name}
        </h4>
      <p className="card-desc">{desc}</p>
      <div className="card-tags-container">
        {topics.map((name, index) => (
          <button key={index} className="card-tags">
            {name}
          </button>
        ))}
        {/* <button className="card-tags">Card</button> */}
      </div>
    </div>
  );
};

export default Card;
