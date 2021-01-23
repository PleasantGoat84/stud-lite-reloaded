import "./News.scss";

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
      <h2>行事暦</h2>
      <div className="week">
        {week.map((d) => (
          <WeekDay key={d.day} day={d.day} date={d.date} {...d.class} />
        ))}
      </div>
      <p className="remark">{remark}</p>
    </div>
  );
};

const News = () => {
  return (
    <div className="news">
      <h1>{getDateString(new Date())}</h1>
      <WeekBar />
    </div>
  );
};

export default News;
