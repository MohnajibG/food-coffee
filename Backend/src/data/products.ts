// Trusted price catalog. Must be kept in sync with Frontend/src/data/cafeterias.json —
// this is the only source checkout prices are validated against, since the client-sent price can't be trusted.
export const PRODUCT_CATALOG: { name: string; price: number }[] = [
  { name: "Spaghetti Bolognese", price: 6.5 },
  { name: "Spaghetti Carbonara", price: 6.5 },
  { name: "Roast Chicken + Side", price: 7.5 },
  { name: "Homemade Burger + Fries", price: 8.5 },

  { name: "Tuna Salad Sandwich", price: 4.5 },
  { name: "Chicken Salad Sandwich", price: 4.5 },
  { name: "Turkey Ham & Emmental Sandwich", price: 4.5 },
  { name: "Chicken Wrap", price: 5.0 },

  { name: "Chicken Panini", price: 5.0 },
  { name: "Tuna Panini", price: 5.0 },
  { name: "Croque-Monsieur", price: 3.5 },

  { name: "Croissant", price: 1.0 },
  { name: "Chocolate Croissant", price: 1.0 },
  { name: "Twist Pastry", price: 1.3 },

  { name: "Coffee", price: 1.2 },
  { name: "Cappuccino", price: 1.8 },
  { name: "Tea", price: 1.2 },
  { name: "Hot Chocolate", price: 2.0 },

  { name: "Still Water 50cl", price: 1.0 },
  { name: "Sparkling Water 50cl", price: 1.2 },
  { name: "Coca-Cola", price: 2.0 },
  { name: "Orange Juice 25cl", price: 2.5 },

  { name: "Brownie", price: 2.0 },
  { name: "Chocolate Cookie", price: 1.5 },
  { name: "Chocolate Muffin", price: 2.0 },
  { name: "Fruit Salad", price: 2.5 },

  { name: "Sandwich Meal Deal", price: 7.5 },
  { name: "Hot Meal Deal", price: 9.5 },
  { name: "Snack Meal Deal", price: 6.5 },
];

export const PRICE_BY_NAME = new Map(
  PRODUCT_CATALOG.map((p) => [p.name, p.price]),
);
