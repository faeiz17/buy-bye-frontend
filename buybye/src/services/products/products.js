const PRODUCTS = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1, // add an ID to match with productId
    name: `Product ${index + 1}`,
    quantity: "1 kg",
    price: 2500 + index * 500,
    store: "at Jalal Sons",
    image: "/images/tapal.png",
    oldPrice: 2700 + index * 500,
  }));
  
  export default PRODUCTS;
  