/** @jsxImportSource @emotion/react */

import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import TagComponent from ".";

const meta: Meta<typeof TagComponent> = {
  component: TagComponent,
  parameters: { controls: { exclude: ["onChange"] } },
  args: {
    children: "Tag",
    checked: false,
    onChange: fn(),
  },
  argTypes: {
    children: { control: { type: "text" } },
    checked: { control: { type: "boolean" } },
  },
};
export default meta;

type Story = StoryObj<typeof TagComponent>;

export const Tag: Story = {};
