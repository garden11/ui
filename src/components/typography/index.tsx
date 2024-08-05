import Paragraph from "./paragraph";
import Text from "./text";
import Title from "./title";

type Typography = {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
};

const Typography: Typography = {} as Typography;
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;

export default Typography;
