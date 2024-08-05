import type { Meta, StoryObj } from "@storybook/react";

import PaginationComponent from ".";

const meta: Meta<typeof PaginationComponent> = {
  component: PaginationComponent,
  parameters: { controls: { exclude: ["onClickButton"] } },
  args: { total: 55 },
  argTypes: {
    total: {
      control: { type: "number", step: 4 },
    },
    initialPage: {
      control: { type: "number" },
    },
    pageSize: { control: { type: "number", step: 20 } },
  },
};
export default meta;

type Story = StoryObj<typeof PaginationComponent>;

export const Pagination: Story = {};
