import type { Meta, StoryObj } from "@storybook/react";

import InputComponent from ".";

const meta: Meta<typeof InputComponent> = {
  component: InputComponent,
  args: {
    placeholder: "내용을 입력해 주세요.",
    size: "medium",
    status: "normal",
    disabled: false,
    textAlign: "left",
  },
  argTypes: {
    placeholder: { control: { type: "text" } },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
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
    textAlign: {
      options: ["left", "center", "right"],
      control: { type: "radio" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof InputComponent>;

export const Input: Story = {};
