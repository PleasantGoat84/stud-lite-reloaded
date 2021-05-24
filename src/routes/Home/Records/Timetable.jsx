import "./Timetable.scss";

import React, { useEffect, useState } from "react";
import api from "../../../api";
import { LOCAL_DAY } from "../../../App";

const MainMenu = (props) => {
  const [classId, setClassId] = useState("");
  const [table, setTable] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      const res = await api.get("timetable");
      setClassId(res.data.classId);

      const newTable = [];
      res.data.courses.forEach((course) => {
        const r = Number(course.tno) - 1;
        const c = Number(course.week) - 1;

        if (!newTable[r]) newTable[r] = [];
        newTable[r][c] = course;
      });
      newTable.forEach((r) => {
        r.forEach((c, i) => {
          const s = [];
          for (let j = 0; j < c.subject.length; j += 2) {
            s.push(c.subject.substr(j, 2));
          }
          c.subject = s.join("\n");
        });

        while (r.length < 5) {
          r.push({});
        }
      });
      setTable(newTable);
    };

    fetchTimetable();
  }, []);

  return (
    <div className="timetable">
      {!!classId.length && (
        <>
          <h1>
            <span className="class-id">{classId}</span>課程安排
          </h1>

          <table>
            <thead>
              <tr>
                {LOCAL_DAY.slice(1, 6).map((d, i) => (
                  <th key={i}>{d}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {table.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j}>
                      <div className="subject">{c.subject}</div>
                      <div className="teacher">{c.teacher}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MainMenu;
