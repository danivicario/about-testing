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
