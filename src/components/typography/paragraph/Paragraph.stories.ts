import type { Meta, StoryObj } from "@storybook/react";

import ParagraphComponent from ".";

const meta: Meta<typeof ParagraphComponent> = {
  title: "components/Typography/Paragraph",
  component: ParagraphComponent,
  args: {
    copyable: true,
    children: "다람쥐 헌 쳇바퀴에 타고파.",
  },
  argTypes: {
    copyable: { control: { type: "boolean" } },
    children: { control: { type: "text" } },
  },
};
export default meta;

type Story = StoryObj<typeof ParagraphComponent>;

export const Paragraph: Story = {};
