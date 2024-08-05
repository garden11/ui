import type { Meta, StoryObj } from "@storybook/react";

import FormComponent from ".";
import Input from "../input";
import Stack from "../stack";

import { spacing } from "src/utils/spacing";

const meta: Meta<typeof FormComponent> = {
  title: "components/Form",
  component: FormComponent,
  args: {
    variant: "vertical",
    itemSize: "medium",
  },
  argTypes: {
    variant: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
    itemSize: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    labelWidth: { control: { type: "number", step: 50 } },
    itemWidth: { control: { type: "number", step: 50 } },
  },
};
export default meta;

type Story = StoryObj<typeof FormComponent>;

export const Form: Story = {
  render: (args) => (
    <FormComponent {...args}>
      <Stack direction="vertical" spacing={spacing.unit20}>
        <FormComponent.Item label="FormItem1">
          <Input placeholder="Input1" width={args.itemWidth ?? "100%"} />
        </FormComponent.Item>
        <FormComponent.Item label="FormItem2">
          <Input placeholder="Input2" width={args.itemWidth ?? "100%"} />
        </FormComponent.Item>
        <FormComponent.Item label="FormItem3">
          <Input placeholder="Input3" width={args.itemWidth ?? "100%"} />
        </FormComponent.Item>
      </Stack>
    </FormComponent>
  ),
};
