export type NumberInputHandle = {
  focus: () => void;
  scrollIntoView: () => void;
  select: () => void;
  get value(): string | undefined;
  set value(value: string | undefined);
};
