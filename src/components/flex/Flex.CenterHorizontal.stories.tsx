import type { Meta, StoryObj } from "@storybook/react";

import Flex from ".";
import Card from "../card";

import { colors } from "src/styles/colors";

const meta: Meta<typeof Flex.CenterHorizontal> = {
  title: "components/Flex/CenterHorizontal",
  component: Flex.CenterHorizontal,
  parameters: { controls: { exclude: ["children", "style"] } },
  args: {
    children: <Card>Card</Card>,
    style: {
      width: "500px",
      height: "300px",
      backgroundColor: colors.neutral100,
    },
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Flex.CenterHorizontal>;

export const CenterHorizontal: Story = {};
