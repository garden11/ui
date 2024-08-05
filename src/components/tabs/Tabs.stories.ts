import type { Meta, StoryObj } from "@storybook/react";

import TabsComponent from ".";

const meta: Meta<typeof TabsComponent> = {
  title: "components/Tabs",
  component: TabsComponent,
  parameters: { controls: { exclude: ["onChange", "items"] } },
  args: {
    width: 500,
    height: undefined,
    items: [
      { key: "TAB1", label: "Tab1", children: "Tab1 Content" },
      {
        key: "TAB2",
        label: "Long Long Long Long Long Long Long Long Long Long LongTab2",
        children: "Tab2 Content",
      },
      { key: "TAB3", label: "Tab3", children: "Tab3 Content" },
      { key: "TAB4", label: "Tab4", children: "Tab4 Content" },
      { key: "TAB5", label: "Tab5", children: "Tab5 Content" },
      { key: "TAB6", label: "Tab6", children: "Tab6 Content" },
      { key: "TAB7", label: "Tab7", children: "Tab7 Content" },
      { key: "TAB8", label: "Tab8", children: "Tab8 Content" },
      { key: "TAB9", label: "Tab9", children: "Tab9 Content" },
      { key: "TAB10", label: "Tab10", children: "Tab10 Content" },
    ],
    defaultActiveKey: "TAB1",
  },
  argTypes: {
    width: { control: { type: "number", step: 50 } },
    height: {
      control: { type: "number", step: 50 },
    },
    defaultActiveKey: {
      options: ["TAB1", "TAB2", "TAB3", "TAB4", "TAB5", "TAB10"],
      control: { type: "radio" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TabsComponent>;

export const Tabs: Story = {};
