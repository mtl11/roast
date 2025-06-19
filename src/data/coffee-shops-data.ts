import { CoffeeShop } from "../model/coffee-shop-dto"; // Import the CoffeeShop type

export const COFFEE_SHOPS: CoffeeShop[] = [
  {
    id: "1",
    name: "Starbucks",
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      fullAddress: "123 Main St, San Francisco, CA",
    },
    rating: 4.5,
    specialty: ["Iced Caramel Macchiato"],
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
  {
    id: "2",
    name: "Blue Bottle Coffee",
    address: {
      street: "456 Market St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      fullAddress: "456 Market St, San Francisco, CA",
    },
    rating: 4.8,
    specialty: ["New Orleans Cold Brew"],
    coordinates: {
      lat: 37.7769,
      lng: -122.4174,
    },
  },
  {
    id: "3",
    name: "Philz Coffee",
    address: {
      street: "789 Mission St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94104",
      fullAddress: "789 Mission St, San Francisco, CA",
    },
    rating: 4.7,
    specialty: ["Mint Mojito Iced Coffee"],
    coordinates: {
      lat: 37.7759,
      lng: -122.4164,
    },
  },
];