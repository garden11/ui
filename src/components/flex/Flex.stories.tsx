import type { Meta, StoryObj } from "@storybook/react";

import FlexComponent from ".";
import Card from "../card";

import { colors } from "src/styles/colors";

const meta: Meta<typeof FlexComponent> = {
  title: "components/Flex",
  component: FlexComponent,
  parameters: { controls: { exclude: ["children", "style"] } },
  args: {
    children: <Card>Card</Card>,
    style: {
      width: "500px",
      height: "300px",
      backgroundColor: colors.neutral100,
    },
    alignItems: "normal",
    justifyContent: "flex-start",
    direction: "row",
  },
  argTypes: {
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

    direction: {
      options: ["row", "row-reverse", "column", "column-reverse"],
      control: {
        type: "radio",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FlexComponent>;

export const Flex: Story = {};
