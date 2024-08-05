import type { Meta, StoryObj } from "@storybook/react";

import GraphBarComponent from ".";

const meta: Meta<typeof GraphBarComponent> = {
  title: "components/GraphBar",
  component: GraphBarComponent,
  args: { width: "200px", proportion: 0.7 },
  argTypes: {
    width: {
      control: { type: "number", step: 50 },
    },
    height: {
      control: { type: "number", step: 10 },
    },
    proportion: {
      control: { type: "number", step: 0.1 },
    },
  },
};
export default meta;

type Story = StoryObj<typeof GraphBarComponent>;

export const GraphBar: Story = {};
