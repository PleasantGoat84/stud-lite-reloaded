import "./News.scss";

import calendarIcon from "../../assets/schedule.svg";
import notificationIcon from "../../assets/notification.svg";
import recordIcon from "../../assets/school-bell.svg";

import { Link } from "react-router-dom";
import { normalizeDate, LOCAL_DAY } from "../../App";
import api from "../../api";

function getDateString(date) {
  const [y, m, d] = normalizeDate(date).split("-");
  return `${y}年${m}月${d}日`;
}

function getWeek(date, off) {
  const startDate = date.getDate() - date.getDay();

  const curDate = new Date(date);
  curDate.setDate(startDate);

  const days = LOCAL_DAY;
  const week = [];

  for (let i = 0; i < 7; i++) {
    if (i > 0) curDate.setDate(curDate.getDate() + 1);

    const cur = curDate.getDate();
    week.push({
      date: cur,
      day: days[i],
      class: {
        active: cur === date.getDate(),
        disabled: curDate < date,
        isOff: i === 0 || off === "ALL_OFF" || off.includes(cur),
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

const WeekDay = ({ day, date, active, disabled, isOff }) => {
  let className = "day-cell";
  if (active) className += " active";
  if (disabled) className += " disabled";
  if (isOff) className += " off";

  return (
    <div className={className}>
      {date}
      <span className="day">{day}</span>
    </div>
  );
};

const WeekBar = ({ calendar }) => {
  const notice = calendar.notice?.[0];

  const week = calendar.date ? getWeek(calendar.date, notice.off) : [];

  const noticeContentMapper = (content) =>
    content ? content.split(/[;；,，]\s*/g).join("\n") : "本週沒有備注";

  return (
    <div className="week-bar">
      <h2>
        <img src={calendarIcon} alt="Calendar" className="icon-left" />
        行事暦
        {notice?.weekId && <span id="week-id">{`第${notice?.weekId}週`}</span>}
      </h2>
      <div className="week">
        {week.map((d) => (
          <WeekDay key={d.day} day={d.day} date={d.date} {...d.class} />
        ))}
      </div>
      <p className="remark">{noticeContentMapper(notice?.content)}</p>
    </div>
  );
};

const NotificationsCard = ({ news, openDialog, updateDialog }) => {
  const senderMapper = (sender) =>
    sender.replace(/(校務顧問|校監|校長|副校長|校助|主任|老師|同學)/g, " $1");

  const TWO_WEEKS = 2 * 7 * 24 * 60 * 60 * 1000;

  const readNotf = (id) => async () => {
    const notf = news.find((n) => n.id === id);
    const preConfig = {
      title: notf.title,
      content: "載入中...",
      footer: senderMapper(notf.sender) + "\n" + normalizeDate(notf.date),
    };
    const dialogId = openDialog(preConfig);

    const res = await api.get("news", { params: { id } });

    updateDialog(dialogId, {
      ...preConfig,
      content: res.data.content,
    });
  };

  return (
    <div className="notifications">
      <h2>
        <img src={notificationIcon} alt="" className="icon-left" />
        校園通知
      </h2>
      <ul className="notf-list">
        {news
          .filter((n) => new Date() - new Date(n.date) <= TWO_WEEKS)
          .map((n) => (
            <li key={n.id} onClick={readNotf(n.id)}>
              <h3>{n.title}</h3>
              <h4>
                {normalizeDate(n.date)} · {senderMapper(n.sender)}
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

const RecordMeter = ({ quota }) => {
  const record = quota?.record || [];

  return (
    <div className="record-meter">
      <h2>
        <img src={recordIcon} alt="Record" className="icon-left" />
        日常表現
      </h2>
      <table>
        <thead>
          <tr>
            {record.map((r) => (
              <th scope="col" key={r.type}>
                {r.type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {record.map((r) => (
              <td key={r.type} className={getRecordClass(r.value, r.quota)}>
                {r.value}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h3>第 {quota.curTerm ? quota.curTerm + 1 : "-"} 學段</h3>
    </div>
  );
};

const News = (props) => {
  return (
    <div className="news">
      <h1>{getDateString(new Date())}</h1>
      <WeekBar {...props} />
      <NotificationsCard {...props} />
      <RecordMeter {...props} />
    </div>
  );
};

export default News;
