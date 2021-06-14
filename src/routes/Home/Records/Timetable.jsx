import React, { useEffect, useState } from "react";
import api from "../../../api";
import loadable from "@loadable/component";

import { LOCAL_DAY } from "../../../App";

const Spinner = loadable(() => import("../../../components/Spinner"));

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
    <div className="px-5">
      {!!classId.length ? (
        <>
          <h1 className="text-center text-2xl mb-4">
            <span className="text-info font-bold">{classId}</span>課程安排
          </h1>

          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                {LOCAL_DAY.slice(1, 6).map((d, i) => (
                  <th
                    key={i}
                    className="bg-primary text-white text-lg border-2 border-info break-words py-2"
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {table.map((r, i) => (
                <tr
                  key={i}
                  className={i === 4 ? "border-b-8 border-primary" : ""}
                >
                  {r.map((c, j) => (
                    <td
                      key={j}
                      className="border-2 border-info break-words whitespace-pre-line bg-light py-2"
                    >
                      <div className="text-secondary mb-1 font-medium text-lg">
                        {c.subject}
                      </div>
                      <div className="text-browny text-sm">{c.teacher}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default MainMenu;
