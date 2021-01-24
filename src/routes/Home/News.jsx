import "./News.scss";

import calendarIcon from "../../assets/schedule.svg";
import notificationIcon from "../../assets/notification.svg";
import recordIcon from "../../assets/school-bell.svg";

import { Link } from "react-router-dom";

function getDateString(date) {
  const [y, m, d] = date.toISOString().substr(0, 10).split("-");
  return `${y}年${m}月${d}日`;
}

function getWeek(date) {
  const startDate = date.getDate() - date.getDay();

  const curDate = new Date(date);
  curDate.setDate(startDate);

  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const week = [];

  for (let i = 0; i < 7; i++) {
    curDate.setDate(startDate + i);
    const cur = curDate.getDate();
    week.push({
      date: cur,
      day: days[i],
      class: {
        active: cur === date.getDate(),
        disabled: curDate < date,
      },
    });
  }

  return week;
}

function getRecordClass(value, trigger) {
  if (value < Math.ceil(trigger / 3)) return "";
  if (value < Math.ceil((trigger / 3) * 2)) return "warning";
  if (value < trigger) return "danger";
  return "fail";
}

const WeekDay = ({ day, date, active, disabled }) => {
  return (
    <div
      className={`day-cell${active ? " active" : ""}${
        disabled ? " disabled" : ""
      }`}
    >
      {date}
      <span className="day">{day}</span>
    </div>
  );
};

const WeekBar = ({ remark }) => {
  const d = new Date();
  const week = getWeek(d);
  console.debug(week);

  remark = "5日下午中華文化節之二；\n6/2至21/2寒假(12日春節)";

  return (
    <div className="week-bar">
      <h2>
        <img src={calendarIcon} alt="Calendar" className="icon-left" />
        行事暦
      </h2>
      <div className="week">
        {week.map((d) => (
          <WeekDay key={d.day} day={d.day} date={d.date} {...d.class} />
        ))}
      </div>
      <p className="remark">{remark}</p>
    </div>
  );
};

const NotificationsCard = () => {
  const notfs = [
    {
      title: "1月18日周會安排通知",
      sender: "袁耀庭 主任",
      date: "2021/01/12",
      id: 9946,
    },
    {
      title: "1月4日周會安排通知",
      sender: "袁耀庭 主任",
      date: "2020/12/30",
      id: 9933,
    },
  ];

  return (
    <div className="notifications">
      <h2>
        <img src={notificationIcon} alt="" className="icon-left" />
        校園通知
      </h2>
      <ul className="notf-list">
        {notfs.map((n) => (
          <li key={n.id}>
            <h3>{n.title}</h3>
            <h4>
              {n.date} · {n.sender}
            </h4>
          </li>
        ))}
      </ul>
      <div className="actions">
        <Link to="../news">更多...</Link>
      </div>
    </div>
  );
};

const RecordMeter = () => {
  const records = [
    {
      name: "欠功課",
      value: 2,
      trigger: 5,
    },
    {
      name: "欠書",
      value: 0,
      trigger: 5,
    },
    {
      name: "遲到",
      value: 1,
      trigger: 3,
    },
    {
      name: "缺席",
      value: 0,
      trigger: 3,
    },
  ];

  return (
    <div className="record-meter">
      <h2>
        <img src={recordIcon} alt="Record" className="icon-left" />
        日常表現
      </h2>
      <table>
        <thead>
          <tr>
            {records.map((r) => (
              <th scope="col" key={r.name}>
                {r.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {records.map((r) => (
              <td key={r.name} className={getRecordClass(r.value, r.trigger)}>
                {r.value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h3>第二學段</h3>
    </div>
  );
};

const News = () => {
  return (
    <div className="news">
      <h1>{getDateString(new Date())}</h1>
      <WeekBar />
      <NotificationsCard />
      <RecordMeter />
    </div>
  );
};

export default News;
