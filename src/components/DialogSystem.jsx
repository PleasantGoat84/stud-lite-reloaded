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
    str.split(/\s*\n+\s*/g).map((p, i) => (
      <p key={i} className="mb-4">
        {p}
      </p>
    ));

  const childrenProps = { dialogMsg: msg, updateDialog, openDialog };

  return (
    <>
      {React.Children.map(children, (c) => {
        if (React.isValidElement(c))
          return React.cloneElement(c, childrenProps);
        return c;
      })}

      {msg.map((m, i) => (
        <div
          className="flex flex-col items-center fixed top-0 left-0 right-0 bottom-20 z-20 p-4"
          key={i}
        >
          <span className="absolute top-0 left-0 h-full w-full bg-black opacity-90"></span>
          <img
            src={closeIcon}
            alt="Close"
            className="absolute w-10 right-2 top-8 cursor-pointer duration-100 active:opacity-50"
            onClick={closeDialog(i)}
          />

          <dialog
            open
            className="relative bg-light text-secondary p-4 w-full rounded border-2 border-primary min-h-1/2 max-h-3/4 overflow-y-scroll"
          >
            <article>
              <header>
                <h1 className="text-xl">{m.title}</h1>

                {m.subtitle && <h2 className="text-lg">{m.subtitle}</h2>}
              </header>

              <hr className="my-4" />

              <main>{contentMapper(m.content)}</main>

              {m.footer && (
                <>
                  <hr className="my-4" />

                  <footer className="text-right">
                    {contentMapper(m.footer)}
                  </footer>
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
