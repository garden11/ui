import type { Meta, StoryObj } from "@storybook/react";

import DividerComponent from ".";

const meta: Meta<typeof DividerComponent> = {
  title: "components/Divider",
  component: DividerComponent,
  args: {
    variant: "horizontal",
    size: 400,
  },
  argTypes: {
    variant: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
    size: { control: { type: "number", step: 50 } },
  },
};
export default meta;

type Story = StoryObj<typeof DividerComponent>;

export const Divider: Story = {};
