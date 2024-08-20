import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";

import NumberInput, { NumberInputHandle } from ".";

describe("NumberInput", () => {});

describe("NumberInput controlled", () => {
  test('should return the value through "get value"', () => {
    const ref = createRef<NumberInputHandle>();

    render(<NumberInput ref={ref} value="1234" />);

    expect(ref.current?.value).toBe("1234");
  });

  test('should update the value through "set value"', async () => {
    const ref = createRef<NumberInputHandle>();

    render(<NumberInput ref={ref} value="1234" />);

    if (!ref.current) return;

    ref.current.value = "2345";

    const inputElement = screen.getByTestId("input") as HTMLInputElement;

    await waitFor(() => {
      expect(inputElement.value).not.toBe("1,234");
    });

    expect(inputElement.value).toBe("2,345");
  });
});

describe("NumberInput uncontrolled", () => {
  test('should return the value through "get value"', () => {
    const ref = createRef<NumberInputHandle>();

    render(<NumberInput ref={ref} defaultValue="1234" />);

    expect(ref.current?.value).toBe("1234");
  });

  test('should update the value through "set value"', () => {
    const ref = createRef<NumberInputHandle>();

    render(<NumberInput ref={ref} defaultValue="1234" />);

    if (!ref.current) return;

    ref.current.value = "2345";

    const inputElement = screen.getByTestId("input") as HTMLInputElement;

    expect(inputElement.value).toBe("2,345");
  });
});
