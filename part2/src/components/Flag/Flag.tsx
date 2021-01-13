import React, { Fragment, FunctionComponent } from "react";
import ENFlag from "./img/EN.svg";
import ESFlag from "./img/ES.svg";

export enum FlagModes {
  countryNameBefore = "BEFORE",
  countryNameAfter = "AFTER"
}

export interface FlagProps {
  country: "EN" | "ES";
  mode: FlagModes;
}

const Flag: FunctionComponent<FlagProps> = ({
  country,
  mode = FlagModes.countryNameAfter
}: FlagProps) => {
  let src: string;

  switch (country) {
    case "ES": {
      src = ESFlag;
      break;
    }

    case "EN": {
      src = ENFlag;
      break;
    }
  }
  return (
    <div className="flag">
      {mode === FlagModes.countryNameAfter && (
        <Fragment>
          <img src={src} /> {country}
        </Fragment>
      )}

      {mode === FlagModes.countryNameBefore && (
        <Fragment>
          {country} <img src={src} />
        </Fragment>
      )}
    </div>
  );
};

export default Flag;
