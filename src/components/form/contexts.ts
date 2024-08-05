import { createContext } from "react";

import { ItemWidth, LabelWidth, ItemSize, Variant } from "./types";

type Context = {
  variant: Variant;
  labelWidth: LabelWidth;
  itemWidth: ItemWidth;
  itemSize: ItemSize;
};

export const Context = createContext<Context>({
  variant: "vertical",
  labelWidth: "auto",
  itemWidth: "auto",
  itemSize: "medium",
});
