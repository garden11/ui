import type { Meta, StoryObj } from "@storybook/react";

import CardComponent from ".";

const meta: Meta<typeof CardComponent> = {
  title: "components/Card",
  component: CardComponent,
  parameters: { controls: { exclude: ["children"] } },
  args: {
    children: (
      <>
        <p>Card Content1</p>
        <p>Card Content2</p>
        <p>Card Content3</p>
      </>
    ),
  },
  argTypes: {
    width: { control: { type: "number", step: 50 } },
    height: { control: { type: "number", step: 50 } },
  },
};
export default meta;

type Story = StoryObj<typeof CardComponent>;

export const Card: Story = {};
