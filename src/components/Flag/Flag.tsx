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
  onClick?: () => void;
}

const Flag: FunctionComponent<FlagProps> = ({
  country,
  mode = FlagModes.countryNameAfter,
  onClick
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
    <div className="flag" onClick={onClick}>
      {mode === FlagModes.countryNameAfter && (
        <Fragment>
          <img src={src} alt={country} /> <span>{country}</span>
        </Fragment>
      )}

      {mode === FlagModes.countryNameBefore && (
        <Fragment>
          <span>{country}</span> <img src={src} alt={country} />
        </Fragment>
      )}
    </div>
  );
};

export default Flag;
