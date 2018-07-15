import category from "./category";

describe("category reducer", () => {
  it("should handle initial state", () => {
    expect(category(undefined, {})).toEqual({});
  });
});
