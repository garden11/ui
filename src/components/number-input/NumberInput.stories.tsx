import type { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useState } from "react";
import { fn } from "@storybook/test";

import NumberInputComponent from ".";

const meta: Meta<typeof NumberInputComponent> = {
  title: "components/NumberInput",
  component: NumberInputComponent,
  parameters: { controls: { exclude: ["onChange"] } },
  args: {
    placeholder: "숫자를 입력해 주세요.",
    size: "medium",
    status: "normal",
    disabled: false,
    onChange: fn(),
  },
  argTypes: {
    placeholder: { control: { type: "text" } },
    size: { options: ["small", "medium", "large"], control: { type: "radio" } },
    status: {
      options: ["normal", "warning", "error"],
      control: { type: "radio" },
    },
    disabled: { type: "boolean" },
    width: {
      control: { type: "number", step: 50 },
    },
    height: {
      control: { type: "number", step: 50 },
    },
  },
};
export default meta;

type Story = StoryObj<typeof NumberInputComponent>;

export const Controlled: Story = {
  render: (args) => <ControlledStoryComponent {...args} />,
};

export const Uncontrolled: Story = {
  argTypes: {
    defaultValue: {
      options: ["10", "100", "1000"],
      control: { type: "radio" },
    },
  },
  render: (args) => <UncontrolledStoryComponent {...args} />,
};

const ControlledStoryComponent = (
  args: ComponentProps<typeof NumberInputComponent>
) => {
  const [value, setValue] = useState<string>();

  const { value: argsValue, onChange, defaultValue, ...restArgs } = args;

  return (
    <NumberInputComponent
      {...restArgs}
      value={value}
      onChange={(event) => {
        onChange?.(event);

        setValue(event.target.value);
      }}
    />
  );
};

const UncontrolledStoryComponent = (
  args: ComponentProps<typeof NumberInputComponent>
) => {
  const { value, ...restArgs } = args;

  return <NumberInputComponent {...restArgs} />;
};
