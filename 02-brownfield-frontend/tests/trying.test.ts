import { describe, it, expect } from "vitest";

function sum(a: number, b: number): number {
  return a + b;
}

describe("sum", () => {
  it("adds two positive numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("adds positive and negative number", () => {
    expect(sum(5, -2)).toBe(3);
  });

  it("adds two negative numbers", () => {
    expect(sum(-4, -6)).toBe(-10);
  });

  it("adds zero", () => {
    expect(sum(0, 7)).toBe(7);
    expect(sum(0, 0)).toBe(0);
  });
});
