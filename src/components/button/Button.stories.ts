import type { Meta, StoryObj } from "@storybook/react";

import Button from ".";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  parameters: {
    controls: {
      exclude: ["variant"],
    },
  },
  args: {
    children: "Button",
    color: "primary",
    size: "medium",
    disabled: false,
  },
  argTypes: {
    children: { control: { type: "text" } },
    color: {
      options: ["primary", "neutral"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    disabled: { control: { type: "boolean" } },
    width: {
      control: { type: "number", step: 50 },
    },
    height: {
      control: { type: "number", step: 50 },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Standard: Story = {
  args: { variant: "standard", rounded: false },
  argTypes: {
    rounded: { control: "boolean" },
  },
};

export const Outlined: Story = {
  args: { variant: "outlined", selected: false },
  argTypes: {
    selected: { control: "boolean" },
  },
};
