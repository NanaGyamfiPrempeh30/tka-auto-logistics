export const siteConfig = {
  name: "TKA Auto's & Logistics",
  shortName: "TKA",
  tagline: "USA auction sourcing to your door in Ghana.",
  url: "https://tkaautoslogistics.com",
  description:
    "TKA Auto's & Logistics sources vehicles from US auctions (Copart, IAAI, Manheim) and ships them door-to-door to Ghana — auction, container, RoRo, towing, and delivery handled end to end.",
};

export const contact = {
  whatsapp: {
    us: { label: "US", number: "+1 470-662-7765", link: "https://wa.me/14706627765" },
    ghana: { label: "Ghana", number: "+233 59 854 1516", link: "https://wa.me/233598541516" },
  },
  email: "info@tkaautoslogistics.com",
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "11:00 AM – 5:00 PM" },
  ],
  social: {
    instagram: { handle: "@kwame_asid", link: "https://instagram.com/kwame_asid" },
    snapchat: { handle: "Tkaautoslogistics", link: "https://snapchat.com/add/Tkaautoslogistics" },
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/inventory", label: "Inventory" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const auctionSources = ["Copart", "IAAI", "Manheim", "CarGurus"];

export type ProcessStep = {
  step: number;
  key: string;
  title: string;
  short: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    key: "auction",
    title: "Auction Sourcing",
    short: "We bid and win on your behalf at Copart, IAAI, and Manheim.",
    detail:
      "You tell us the make, model, year, and budget. Our team bids at licensed US auctions — Copart, IAAI, and Manheim — and secures the vehicle in your name. We share the auction report and final purchase price before anything ships.",
  },
  {
    step: 2,
    key: "container",
    title: "Container Shipping",
    short: "Vehicles are loaded and sealed into ocean containers bound for Ghana.",
    detail:
      "Once purchased, the vehicle is transported to our port warehouse, inspected, and loaded into a shipping container. Containers give the best protection for the ocean crossing and are the default option for most orders.",
  },
  {
    step: 3,
    key: "roro",
    title: "RoRo Shipping",
    short: "Roll-on/roll-off shipping for a faster, lower-cost ocean crossing.",
    detail:
      "For customers who want a lower shipping cost, we offer RoRo (Roll-on/Roll-off) service — the vehicle is driven directly onto the vessel. It's a faster booking option and works well for running vehicles in good condition.",
  },
  {
    step: 4,
    key: "towing",
    title: "State-to-State Towing",
    short: "Inland towing gets the vehicle from the auction yard to the port.",
    detail:
      "Most auction wins aren't sitting at the port. We arrange licensed inland towing to move the vehicle from the auction yard — anywhere in the US — to our departure port, fully insured in transit.",
  },
  {
    step: 5,
    key: "delivery",
    title: "Door-to-Door Ghana Delivery",
    short: "Customs clearance and final delivery, anywhere in Ghana.",
    detail:
      "On arrival in Ghana, we handle port clearance and customs paperwork, then deliver the vehicle to your city — Accra, Kumasi, Takoradi, or wherever you are. You track every stage from your dashboard.",
  },
];

export type InventoryItem = {
  id: string;
  title: string;
  year: number;
  make: string;
  model: string;
  auctionSource: string;
  status: "Sourced" | "In Transit" | "Delivered";
  notes: string;
};

export const inventoryShowcase: InventoryItem[] = [
  {
    id: "inv-1",
    title: "2019 Toyota Camry SE",
    year: 2019,
    make: "Toyota",
    model: "Camry SE",
    auctionSource: "Copart",
    status: "Delivered",
    notes: "Clean title, minor front-end damage repaired before shipping.",
  },
  {
    id: "inv-2",
    title: "2020 Honda CR-V EX-L",
    year: 2020,
    make: "Honda",
    model: "CR-V EX-L",
    auctionSource: "IAAI",
    status: "In Transit",
    notes: "Sourced for a customer in Kumasi — currently on RoRo vessel.",
  },
  {
    id: "inv-3",
    title: "2018 Ford F-150 XLT",
    year: 2018,
    make: "Ford",
    model: "F-150 XLT",
    auctionSource: "Manheim",
    status: "Delivered",
    notes: "Popular pick for commercial/trade use in Accra.",
  },
  {
    id: "inv-4",
    title: "2021 Toyota Highlander",
    year: 2021,
    make: "Toyota",
    model: "Highlander",
    auctionSource: "Copart",
    status: "Sourced",
    notes: "Container booked — departs port within 2 weeks.",
  },
  {
    id: "inv-5",
    title: "2017 Lexus RX 350",
    year: 2017,
    make: "Lexus",
    model: "RX 350",
    auctionSource: "Manheim",
    status: "Delivered",
    notes: "Full-service history, sourced with zero auction issues.",
  },
  {
    id: "inv-6",
    title: "2019 Chevrolet Suburban",
    year: 2019,
    make: "Chevrolet",
    model: "Suburban",
    auctionSource: "IAAI",
    status: "In Transit",
    notes: "Container shipment, arriving Tema port next month.",
  },
];
