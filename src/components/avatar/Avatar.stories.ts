import type { Meta, StoryObj } from "@storybook/react";

import AvatarComponent from ".";

const meta: Meta<typeof AvatarComponent> = {
  title: "components/Avatar",
  component: AvatarComponent,
  args: { size: "medium", shape: "circle" },
  argTypes: {
    size: { options: ["small", "medium", "large"], control: { type: "radio" } },
    shape: { options: ["circle", "square"], control: { type: "radio" } },
    src: { control: { type: "text" } },
    alt: { control: { type: "text" } },
  },
};
export default meta;

type Story = StoryObj<typeof AvatarComponent>;

export const Avatar: Story = {};
