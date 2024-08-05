import type { Meta, StoryObj } from "@storybook/react";

import TitleComponent from ".";

const meta: Meta<typeof TitleComponent> = {
  title: "components/Typography/Title",
  component: TitleComponent,
  parameters: { controls: { exclude: ["margin"] } },
  args: {
    level: 1,
    children: "다람쥐 헌 쳇바퀴에 타고파.",
    whiteSpace: "normal",
    wordWrap: "normal",
    writingMode: "horizontal-tb",
    textOrientation: "mixed",
  },
  argTypes: {
    level: { options: [1, 2, 3, 4, 5], control: { type: "radio" } },
    children: { control: { type: "text" } },
    whiteSpace: {
      options: ["normal", "nowrap", "pre", "pre-line", "pre-wrap"],
      control: { type: "radio" },
    },
    wordWrap: {
      options: ["normal", "break-word"],
      control: { type: "radio" },
    },
    writingMode: {
      options: ["horizontal-tb", "vertical-rl", "vertical-lr"],
      control: { type: "radio" },
    },
    textOrientation: {
      options: [
        "mixed",
        "upright",
        "sideways",
        "sideways-right",
        "use-glyph-orientation",
      ],
      control: { type: "radio" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TitleComponent>;

export const Title: Story = {};
