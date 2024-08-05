import type { Meta, StoryObj } from "@storybook/react";

import TextFieldComponent from ".";

const meta: Meta<typeof TextFieldComponent> = {
  title: "components/TextField",
  component: TextFieldComponent,
  parameters: {
    controls: {
      exclude: ["variant", "placeholder"],
    },
  },
  args: {
    label: "TextField",
    disabled: false,
    status: "normal",
    size: "medium",
  },
  argTypes: {
    label: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    status: {
      options: ["normal", "warning", "error"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    width: {
      control: { type: "number", step: 50 },
    },
    height: {
      control: { type: "number", step: 50 },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextFieldComponent>;

export const TextField: Story = {};
