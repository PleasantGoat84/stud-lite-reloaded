import React, { useState } from "react";
import closeIcon from "../assets/cancel.svg";

import { cloneDeep } from "lodash";

function DialogSystem({ children }) {
  const [msg, setMsg] = useState([]);

  const closeDialog = (idx) => () => {
    const newMsg = cloneDeep(msg);
    newMsg.splice(idx, 1);
    setMsg(newMsg);
  };

  const updateDialog = (idx, newConfig) => {
    const newMsg = cloneDeep(msg);
    newMsg[idx] = { ...newMsg[idx], ...newConfig };
    setMsg(newMsg);
  };

  const openDialog = (config) => {
    const newMsg = cloneDeep(msg);
    const idx = newMsg.push(config) - 1;
    setMsg(newMsg);
    return idx;
  };

  const contentMapper = (str) =>
    str.split(/\s*\n+\s*/g).map((p, i) => <p key={i}>{p}</p>);

  const childrenProps = { dialogMsg: msg, updateDialog, openDialog };

  return (
    <>
      {React.Children.map(children, (c) => {
        if (React.isValidElement(c))
          return React.cloneElement(c, childrenProps);
        return c;
      })}

      {msg.map((m, i) => (
        <div className="dialog-overlay" key={i}>
          <img
            src={closeIcon}
            alt="Close"
            className="dialog-close"
            onClick={closeDialog(i)}
          />

          <dialog open>
            <article>
              <header>
                <h1>{m.title}</h1>

                {m.subtitle && <h2>{m.subtitle}</h2>}
              </header>

              <hr />

              <main>{contentMapper(m.content)}</main>

              {m.footer && (
                <>
                  <hr />

                  <footer>{contentMapper(m.footer)}</footer>
                </>
              )}
            </article>
          </dialog>
        </div>
      ))}
    </>
  );
}

export default DialogSystem;
