import React, { FunctionComponent } from "react";
import ReactTooltip from "react-tooltip";

import FlagProps, { FlagModes } from "./FlagProps";
import ARFlag from "./img/AR.svg";
import DEFlag from "./img/DE.svg";
import ENFlag from "./img/EN.svg";
import ESFlag from "./img/ES.svg";
import FRFlag from "./img/FR.svg";
import IDFlag from "./img/ID.svg";
import ITFlag from "./img/IT.svg";
import JAFlag from "./img/JA.svg";
import KOFlag from "./img/KO.svg";
import PLFlag from "./img/PL.svg";
import PTFlag from "./img/PT.svg";
import RUFlag from "./img/RU.svg";
import TRFlag from "./img/TR.svg";
import VIFlag from "./img/VI.svg";
import ZHFlag from "./img/ZH.svg";

export enum FlagModes {
  before = "BEFORE",
  after = "AFTER"
}

export default interface FlagProps {
  countries: string | string[];
  mode?: FlagModes;
  onClick?: Function;
  className?: string;
  tipPlacement?: "top" | "bottom" | undefined;
}

const Flag: FunctionComponent<FlagProps> = ({ country }: FlagProps) => {
  return <div>hola</div>;
};

export default Flag;
