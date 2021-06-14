import calendarIcon from "../../assets/schedule.svg";
import notificationIcon from "../../assets/notification.svg";
import recordIcon from "../../assets/school-bell.svg";

import { Link } from "react-router-dom";
import { normalizeDate, LOCAL_DAY } from "../../App";
import api from "../../api";

import "./News.css";

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
  if (value < Math.ceil(trigger / 3)) return "text-green-400 text-lg";
  if (value < Math.ceil((trigger / 3) * 2))
    return "text-yellow-500 font-bold text-xl";
  if (value < trigger) return "text-red-400 font-bold text-2xl";
  return "text-black text-2xl";
}

const WeekDay = ({ day, date, active, disabled, isOff }) => {
  let className =
    "flex-grow py-3 relative text-center border-r-2 border-primary last:border-r-0";
  if (active) className += " bg-primary text-white";
  if (disabled) className += " bg-browny text-light";
  if (isOff) className += " bg-green-400 text-light";

  return (
    <div className={className}>
      {date}
      <span className="text-xs absolute top-0 left-1 font-normal">{day}</span>
      {active && (
        <span className="absolute text-xs right-0 bottom-0 font-normal">
          今天
        </span>
      )}
    </div>
  );
};

const WeekBar = ({ calendar }) => {
  const notice = calendar.notice?.[0];

  const week = calendar.date ? getWeek(calendar.date, notice.off) : [];

  const noticeContentMapper = (content) =>
    content ? content.split(/[;；,，]\s*/g).join("\n") : "本週沒有備注";

  return (
    <div className="news-card">
      <h2 className="bg-secondary text-white rounded-t">
        <img src={calendarIcon} alt="Calendar" />
        行事暦
        {notice?.weekId && (
          <span className="absolute right-3 text-base">{`第${notice?.weekId}週`}</span>
        )}
      </h2>
      <div className="flex items-center justify-center border-2 border-primary text-browny text-xl font-semibold">
        {week.map((d) => (
          <WeekDay key={d.day} day={d.day} date={d.date} {...d.class} />
        ))}
      </div>
      <p className="border-2 border-secondary p-3 whitespace-pre-line rounded-b">
        {noticeContentMapper(notice?.content)}
      </p>
    </div>
  );
};

const NotificationsCard = ({ news, openDialog, updateDialog }) => {
  const TWO_WEEKS = 2 * 7 * 24 * 60 * 60 * 1000;
  // news = news.filter((n) => new Date() - new Date(n.date) <= TWO_WEEKS);

  const senderMapper = (sender) =>
    sender.replace(/(校務顧問|校監|校長|副校長|校助|主任|老師|同學)/g, " $1");

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
    <div className="news-card bg-light text-secondary px-4 py-3">
      <h2>
        <img src={notificationIcon} alt="Bell" className="icon-left" />
        校園通知
      </h2>
      <ul className="notf-list bg-white w-full border-2 border-browny my-2">
        {news.length ? (
          news.map((n) => (
            <li key={n.id} onClick={readNotf(n.id)}>
              <h3>{n.title}</h3>
              <h4>
                {normalizeDate(n.date)} · {senderMapper(n.sender)}
              </h4>
            </li>
          ))
        ) : (
          <li>
            <h3 className="text-primary font-semibold">暫無最新通知</h3>
          </li>
        )}
      </ul>
      <div className="flex justify-end">
        <Link to="../news">更多...</Link>
      </div>
    </div>
  );
};

const RecordMeter = ({ quota }) => {
  const record = quota?.record || [];

  return (
    <div className="news-card bg-info text-white">
      <h2>
        <img src={recordIcon} alt="Record" className="icon-left" />
        日常表現
      </h2>
      <table className="border-2 border-info bg-white text-black rounded border-collapse mx-2">
        <thead>
          <tr>
            {record.map((r) => (
              <th
                scope="col"
                key={r.type}
                className="border-2 border-secondary px-2 py-1"
              >
                {r.type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {record.map((r) => (
              <td
                key={r.type}
                className={
                  "border-2 border-secondary px-2 py-1 " +
                  getRecordClass(r.value, r.quota)
                }
              >
                {r.value}
                <span className="text-xs ml-1 text-browny">次</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h3 className="text-center p-2 text-xl">
        第 {quota.curTerm ? quota.curTerm + 1 : "-"} 學段
      </h3>
    </div>
  );
};

const News = (props) => {
  return (
    <div className="flex flex-col px-4 news">
      <h1 className="text-center text-3xl font-bold">
        {getDateString(new Date())}
      </h1>
      <WeekBar {...props} />
      <NotificationsCard {...props} />
      <RecordMeter {...props} />
    </div>
  );
};

export default News;
