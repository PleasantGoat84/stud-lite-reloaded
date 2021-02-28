import React, { useState } from "react";
import closeIcon from "../assets/cancel.svg";
import { cloneDeep } from "lodash";

function DialogSystem() {
  const [msg, setMsg] = useState([]);

  const closeDialog = (idx) => () => {
    const newMsg = cloneDeep(msg);
    newMsg.splice(idx, 1);
    setMsg(newMsg);
  };

  const updateContent = (idx, newContent) => {
    const newMsg = cloneDeep(msg);
    newMsg[idx].content = newContent;
    setMsg(newMsg);
  };

  return msg.map((m, i) => (
    <div className="dialog-overlay" key={i}>
      <img
        src={closeIcon}
        alt="Close"
        className="dialog-close"
        onClick={closeDialog(i)}
      />

      <dialog open>
        <article>
          <h1>{m.title}</h1>

          {m.subtitle && <h2>{m.subtitle}</h2>}

          {m.content.split(/[\n\s]+/g).map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </article>
      </dialog>
    </div>
  ));
}

export default DialogSystem;
