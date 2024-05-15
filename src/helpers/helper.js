const sumProducts = (products) => {
  const itemsCounter = products.reduce((acc, cur) => acc + cur.quantity, 0);
  const total = products.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );
  return { itemsCounter, total };
};

const filterSearchProduct = (products, search) => {
  if (!search) return products;
  const finalProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search)
  );
  return finalProducts;
};

const filterCategoryProduct = (products, category) => {
  if (!category) return products;
  const finalProducts = products.filter((item) => item.category === category);
  return finalProducts;
};

export { sumProducts, filterSearchProduct, filterCategoryProduct };
