/* eslint-disable no-undef */
import { calculateTotalPrices } from "../utils/calculator.js";

describe("calculator.js", () => {
  const formData = {
    articles: [
      { reference: "ref1", quantity: 2 },
      { reference: "ref2", quantity: 1 },
    ],
  };

  const articles = [
    { reference: "ref1", price: "10.00", taxRate: "0.10" },
    { reference: "ref2", price: "20.00", taxRate: "0.20" },
  ];

  it("should calculate total prices correctly", () => {
    const result = calculateTotalPrices(formData, articles);
    expect(result.totalPriceExcludingTaxes).toEqual("40.00");
    expect(result.totalPriceIncludingTaxes).toEqual("46.00");
  });
});
