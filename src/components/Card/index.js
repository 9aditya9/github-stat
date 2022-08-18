import React from "react";
import "./styles.css";

const Card = ({ name, desc, tags = [{ name: "Card" }] }) => {
  return (
    <div className="card-container">
      <h3 className="card-title">{name}</h3>
      <p>{desc}</p>
      <div>
        {/* {tags.map((tag) => (
            <button key={tag.name} className="card-tags">{tag.name}</button>
          ))} */}
        <button className="card-tags">Card</button>
      </div>
    </div>
  );
};

export default Card;
