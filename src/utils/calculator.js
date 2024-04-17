export const calculateTotalPrices = (formData, articles) => {
  let totalPriceExcludingTaxes = 0;
  let totalPriceIncludingTaxes = 0;

  formData.articles.forEach((article) => {
    const selectedArticle = articles.find(
      (a) => a.reference === article.reference
    );
    const articlePrice = parseFloat(selectedArticle.price);
    const taxRate = parseFloat(selectedArticle.taxRate);
    const totalPriceForArticle = articlePrice * article.quantity;
    const taxAmountForArticle = totalPriceForArticle * taxRate;

    totalPriceExcludingTaxes += totalPriceForArticle;
    totalPriceIncludingTaxes += totalPriceForArticle + taxAmountForArticle;
  });

  return {
    totalPriceExcludingTaxes: totalPriceExcludingTaxes.toFixed(2),
    totalPriceIncludingTaxes: totalPriceIncludingTaxes.toFixed(2),
  };
};
