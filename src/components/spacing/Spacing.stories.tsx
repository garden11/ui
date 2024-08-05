import type { Meta, StoryObj } from "@storybook/react";

import SpacingComponent from ".";
import Typography from "../typography";
import Stack from "../stack";

const meta: Meta<typeof SpacingComponent> = {
  title: "components/Spacing",
  component: SpacingComponent,
  parameters: { controls: { exclude: ["direction"] } },
  args: { size: 20 },
  argTypes: {
    size: { options: [20, 40, 60], control: "radio" },
  },
};
export default meta;

type Story = StoryObj<typeof SpacingComponent>;

export const Horizontal: Story = {
  args: { direction: "horizontal" },
  render: (args) => (
    <Stack direction="horizontal">
      <Typography.Title
        margin={{ top: "0px", bottom: "0px" }}
        writingMode="vertical-rl"
      >
        로렘 입숨
      </Typography.Title>
      <SpacingComponent {...args} />
      로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인
      분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을
      보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실질적인
      문장 내용이 채워지기 전에 디자인 프로젝트 모형의 채움 글로도 이용된다.
      이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로
      로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.
    </Stack>
  ),
};

export const Vertical: Story = {
  args: { direction: "vertical" },
  render: (args) => (
    <Stack direction="vertical">
      <Typography.Title
        margin={{ top: "0px", bottom: "0px" }}
        whiteSpace="nowrap"
      >
        로렘 입숨
      </Typography.Title>
      <SpacingComponent {...args} />
      로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인
      분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을
      보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실질적인
      문장 내용이 채워지기 전에 디자인 프로젝트 모형의 채움 글로도 이용된다.
      이런 용도로 사용할 때 로렘 입숨을 그리킹(greeking)이라고도 부르며, 때로
      로렘 입숨은 공간만 차지하는 무언가를 지칭하는 용어로도 사용된다.
    </Stack>
  ),
};
