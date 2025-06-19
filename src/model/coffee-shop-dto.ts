export type CoffeeShop = {
    id: string; // Unique identifier
    name: string;
    description?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      fullAddress?: string; // Optional if needed separately
    };
    coordinates: {
      lat: number;
      lng: number;
    };
    openingHours?: {
      [day: string]: { open: string; close: string } | null; // e.g., { "Monday": { open: "08:00", close: "18:00" } }
    };
    specialty?: string[]; // e.g., "Iced Caramel Macchiato"
    website?: string;
    phone?: string;
    imageUrl?: string; // For list cards or map popups
    tags?: string[]; // e.g., ["outdoor seating", "wifi", "local roaster"]
    rating?: number; // e.g., 4.5
    reviewCount?: number; // e.g., 120
    isOpenNow?: boolean; // Useful for real-time filtering
  };
  