/** @jsxImportSource @emotion/react */

import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
  forwardRef,
  useContext,
} from "react";

import Item from "./item";

import { Context } from "./contexts";

import type { ItemWidth, LabelWidth, ItemSize, Variant } from "./types";

type Props = {
  variant?: Variant;
  labelWidth?: LabelWidth;
  itemWidth?: ItemWidth;
  itemSize?: ItemSize;
} & HTMLAttributes<HTMLFormElement>;
export type { Props as FormProps };

type FormComponent = ForwardRefExoticComponent<
  PropsWithoutRef<Props> & RefAttributes<HTMLFormElement>
>;

const FormComponent = forwardRef<HTMLFormElement, Props>((props, ref) => {
  const context = useContext(Context);

  const {
    variant: propsVariant,
    labelWidth: propsLabelWidth,
    itemWidth: propsItemWidth,
    itemSize: propsItemSize,
    ...restProps
  } = props;

  const { variant, labelWidth, itemWidth, itemSize } = {
    variant: propsVariant ?? context.variant,
    labelWidth: propsLabelWidth ?? context.labelWidth,
    itemWidth: propsItemWidth ?? context.itemWidth,
    itemSize: propsItemSize ?? context.itemSize,
  };

  return (
    <Context.Provider
      value={{
        variant,
        labelWidth,
        itemWidth,
        itemSize,
      }}
    >
      <form ref={ref} {...restProps} />
    </Context.Provider>
  );
});

type Form = FormComponent & {
  Item: typeof Item;
};

const Form: Form = FormComponent as Form;
Form.Item = Item;

export default Form;
