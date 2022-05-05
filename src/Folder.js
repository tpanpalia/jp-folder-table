import React, { useState } from "react";
import * as data from "./data.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./index.css";

function Folder({ root }) {
  const [displayNested, setDisplayNested] = useState({});
  const onClickHandler = (x) => {
    let temp = { ...displayNested };
    if (temp[x]) {
      temp[x] = !temp[x];
    } else {
      temp[x] = true;
    }
    setDisplayNested(temp);
  };
  if (root && root.type === "folder") {
    const temp = root["child"];
    return (
      <div>
        {temp.map((x) => {
          return (
            <div
              onClick={(e) => {
                onClickHandler(x);
                e.stopPropagation();
              }}
              style={{ marginLeft: "50px" }}
              index={x}
              className="folder_name"
            >
              {!/.txt/.test(x) && (
                <>
                  {displayNested[x] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </>
              )}
              {x}
              {displayNested[x] && <Folder key={data[x]} root={data[x]} />}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Folder;
