import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";

import ItemComponent from ".";
import Input from "src/components/input";

const meta: Meta<typeof ItemComponent> = {
  title: "components/Form/Item",
  component: ItemComponent,
  parameters: { controls: { exclude: ["children", "name"] } },
  args: {
    name: "item",
    variant: "vertical",
    label: "FormItem1",
    hint: "내용을 입력해 주세요.",
    status: "normal",
    size: "medium",
  },
  argTypes: {
    variant: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
    label: { control: { type: "text" } },
    hint: { control: { type: "text" } },
    status: {
      options: ["normal", "warning", "error"],
      control: { type: "radio" },
    },
    width: { control: { type: "number", step: 50 } },
    labelWidth: { control: { type: "number", step: 50 } },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ItemComponent>;

export const Item: Story = {
  render: (args) => <ItemStoryComponent {...args} />,
};

const ItemStoryComponent = (args: ComponentProps<typeof ItemComponent>) => {
  const { labelFor, name, ...restArgs } = args;

  return (
    <ItemComponent name={name} {...restArgs}>
      <Input placeholder="Input" width={args.width ? "100%" : "auto"} />
    </ItemComponent>
  );
};
