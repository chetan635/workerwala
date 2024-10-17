import React from "react";
import "../../css/common/Loader.css"
import WorkerWalaLogo from "./WorkerWalaLogoV2";

export default function Loader() {
  return (
    <div className="loader-body">
      <div class="wrapper">
        <div class="cube">
          <div class="bottom"></div>
          <div class="side back"></div>
          <div class="side Loaderleft"></div>
          <div class="side Loaderright"></div>
          <div class="side front"></div>
        </div>
      </div>
      <WorkerWalaLogo/>
    </div>
  );
}
