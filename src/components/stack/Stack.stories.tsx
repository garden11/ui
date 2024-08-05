import type { Meta, StoryObj } from "@storybook/react";

import StackComponent from ".";
import Card from "../card";

import { colors } from "src/styles/colors";

const meta: Meta<typeof StackComponent> = {
  title: "components/Stack",
  component: StackComponent,
  parameters: { controls: { exclude: ["direction", "selector", "style"] } },
  args: {
    spacing: 20,
    alignItems: "normal",
    justifyContent: "flex-start",
    style: {
      width: "500px",
      height: "300px",
      backgroundColor: colors.neutral100,
    },
  },
  argTypes: {
    spacing: { options: [20, 40, 60], control: { type: "radio" } },
    alignItems: {
      options: [
        "normal",
        "stretch",
        "center",
        "flex-start",
        "flex-end",
        "start",
        "end",
        "baseline",
      ],
      control: {
        type: "radio",
      },
    },
    justifyContent: {
      options: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      control: {
        type: "radio",
      },
    },
  },
  render: (args) => (
    <StackComponent {...args}>
      <Card>Card1</Card>
      <Card>Card2</Card>
      <Card>Card3</Card>
    </StackComponent>
  ),
};

export default meta;

type Story = StoryObj<typeof StackComponent>;

export const Horizontal: Story = {
  args: { direction: "horizontal" },
};

export const Vertical: Story = {
  args: { direction: "vertical" },
};
