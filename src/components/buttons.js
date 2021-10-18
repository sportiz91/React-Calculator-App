import React from "react";
import keys from "./references";

const MyButton = ({ myClass, myFunction, key, id }) => {
  return (
    <button
      className={`btn ${myClass} ${id === "0" ? "zero" : ""}`}
      onClick={myFunction}
    >
      {id}
    </button>
  );
};

export default MyButton;
//Lesson learnt: you can't use the must key prop to pass a string value dynamically. For example, in this case, if I apply {key} to the button,
//instead of {id}, it wouldn't work.
