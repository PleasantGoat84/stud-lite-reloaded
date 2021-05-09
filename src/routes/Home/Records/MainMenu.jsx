import "./MainMenu.scss";

import React from "react";
import { Link } from "react-router-dom";

import timeIcon from "../../../assets/record_menu/time-management.svg";
import hwIcon from "../../../assets/record_menu/studying.svg";
import meritIcon from "../../../assets/record_menu/medal.svg";
import gradesIcon from "../../../assets/record_menu/score.svg";

const MainMenu = (props) => {
  const btns = [
    {
      label: "課程安排",
      to: "timetable",
      icon: timeIcon,
      bgColor: "#7596ff",
      color: "#f8fcda",
    },
    {
      label: "功課査詢",
      to: "homework",
      icon: hwIcon,
      bgColor: "#f8fcda",
      color: "#7596ff",
    },
    {
      label: "奬懲資訊",
      to: "merit",
      icon: meritIcon,
      bgColor: "#ffc0e7",
      color: "#3b62d2",
    },
    {
      label: "成績發表",
      to: "grades",
      icon: gradesIcon,
      bgColor: "#847577",
    },
  ];

  return (
    <div className="main-menu">
      {btns.map((b) => (
        <Link
          key={b.to}
          to={`./${b.to}`}
          style={{ backgroundColor: b.bgColor, color: b.color || "white" }}
        >
          <img src={b.icon} alt={b.label} />
          <h2>{b.label}</h2>
        </Link>
      ))}
    </div>
  );
};

export default MainMenu;
