import React from "react";
import closeIcon from "../assets/cancel.svg";

function DialogSystem({ dialogMsg: msg, closeDialog }) {
  const contentMapper = (str) =>
    str.split(/\s*\n+\s*/g).map((p, i) => <p key={i}>{p}</p>);

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
  ));
}

export default DialogSystem;
