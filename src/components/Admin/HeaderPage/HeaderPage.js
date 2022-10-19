import React from "react";
import "./_HeaderPage.scss";

export function HeaderPage(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;

  return (
    <div className="header-container">
      <h2>{title}</h2>
      <div>
        {btnTitle && (
          <button className="positive" onClick={btnClick}>
            {btnTitle}
          </button>
        )}
        {btnTitleTwo && (
          <button className="negative" onClick={btnClickTwo}>
            {btnTitleTwo}
          </button>
        )}
      </div>
    </div>
  );
}
