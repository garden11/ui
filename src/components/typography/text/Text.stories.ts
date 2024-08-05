import type { Meta, StoryObj } from "@storybook/react";

import TextComponent from ".";

const meta: Meta<typeof TextComponent> = {
  title: "components/Typography/Text",
  component: TextComponent,
  args: {
    children: "다람쥐 헌 쳇바퀴에 타고파.",
    variant: "standard",
  },
  argTypes: {
    children: { control: { type: "text" } },
    variant: {
      options: [
        "standard",
        "warning",
        "danger",
        "disabled",
        "code",
        "mark",
        "keyboard",
        "deleted",
        "strong",
        "italic",
      ],
      control: { type: "radio" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextComponent>;

export const Text: Story = {};
