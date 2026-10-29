export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "ev-charging" | "battery-storage" | "power-solar";
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  warranty: string;
  specs: { [key: string]: string };
  highlights: string[];
  image: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "ev-home-7kw",
    name: "VLOXIA Smart Home Wallbox 7.4 kW",
    tagline: "Intelligent residential AC fast charger with app & RFID access",
    category: "ev-charging",
    categoryLabel: "EV Charging",
    price: 38500,
    originalPrice: 45000,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    warranty: "3 Years Comprehensive Warranty",
    specs: {
      "Power Output": "7.4 kW (Single Phase)",
      "Connector Type": "Type 2 Gun (IEC 62196)",
      "Cable Length": "5 Metres Heavy-duty",
      "Protection": "IP65 Weatherproof & IK10",
      "Connectivity": "Wi-Fi, Bluetooth & RFID",
    },
    highlights: [
      "Overnight full charge for 4-wheelers in 5-7 hours",
      "Mobile app scheduling & energy consumption tracking",
      "Inbuilt dynamic load balancing & surge protection",
      "Compatible with Tata Nexon, Tiago, MG ZS EV, Mahindra XUV400 & all Type-2 EVs",
    ],
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
  },
  {
    id: "ev-comm-22kw",
    name: "VLOXIA Commercial Dual-Gun AC Charger 22 kW",
    tagline: "Heavy-duty commercial charging station for fleets, offices & malls",
    category: "ev-charging",
    categoryLabel: "EV Charging",
    price: 85000,
    originalPrice: 98000,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    warranty: "3 Years Warranty + AMC Support",
    specs: {
      "Power Output": "22 kW (3-Phase 32A per gun)",
      "Guns": "Dual Type 2 Fast Charging Ports",
      "Protocol": "OCPP 1.6J Open Protocol",
      "Billing": "CMS Integrated / UPI QR Billing Ready",
      "Enclosure": "Corrosion-resistant Metallic IP54",
    },
    highlights: [
      "Charge two electric vehicles simultaneously at high speed",
      "Centralised cloud management with remote firmware updates",
      "Automated revenue collection with billing software",
      "Ideal for hotels, hospitals, tech parks and public hubs",
    ],
    image: "https://images.unsplash.com/photo-1558441719-8b459c86f6c0?auto=format&fit=crop&w=800&q=80",
    badge: "Commercial Grade",
  },
  {
    id: "ev-dc-30kw",
    name: "VLOXIA Ultra DC Fast Charger 30 kW",
    tagline: "Rapid DC charging unit for commercial hubs and fleet corridors",
    category: "ev-charging",
    categoryLabel: "EV Charging",
    price: 345000,
    originalPrice: 380000,
    rating: 5.0,
    reviewsCount: 12,
    inStock: true,
    warranty: "2 Years OEM Warranty",
    specs: {
      "Output Capacity": "30 kW Direct DC Fast Charge",
      "Connector": "Single CCS2 Liquid/Air-cooled Connector",
      "Efficiency": "> 95% High Efficiency Conversion",
      "Display": "7-inch Touchscreen Interactive HMI",
      "Network": "4G / Ethernet / Wi-Fi Cloud Sync",
    },
    highlights: [
      "0 to 80% charge in 40–55 minutes depending on battery size",
      "Emergency stop button & multi-layer isolation safety",
      "Complete compliance with ARAI & CEA regulations",
      "Engineered for heavy-duty fleet turnaround cycles",
    ],
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    badge: "DC Rapid",
  },
  {
    id: "batt-lifepo4-5kwh",
    name: "VLOXIA Wall-Mount LiFePO4 Energy Pack 5.12 kWh",
    tagline: "Ultra-long life lithium battery system with smart BMS for homes and offices",
    category: "battery-storage",
    categoryLabel: "Lithium Storage",
    price: 115000,
    originalPrice: 130000,
    rating: 4.9,
    reviewsCount: 44,
    inStock: true,
    warranty: "10 Years Lifespan / 5 Years Replacement",
    specs: {
      "Nominal Voltage": "51.2 V",
      "Rated Capacity": "100 Ah (5.12 kWh Total)",
      "Cycle Life": "6,000+ Cycles @ 80% DoD",
      "BMS": "Built-in Smart Active Equalizer BMS",
      "Form Factor": "Ultra-slim Wall Mount / Rack Mount",
    },
    highlights: [
      "Zero maintenance, 100% safe Grade-A LiFePO4 chemistry",
      "Direct drop-in replacement for bulky lead-acid inverter batteries",
      "Parallel expandable up to 16 units (over 80 kWh)",
      "High thermal stability & built-in short circuit protection",
    ],
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
  },
  {
    id: "batt-lifepo4-2kwh",
    name: "VLOXIA Compact LiFePO4 Battery 2.56 kWh",
    tagline: "Compact 24V lithium battery pack for modern home inverters & backup",
    category: "battery-storage",
    categoryLabel: "Lithium Storage",
    price: 58000,
    originalPrice: 65000,
    rating: 4.8,
    reviewsCount: 27,
    inStock: true,
    warranty: "5 Years Full Warranty",
    specs: {
      "Nominal Voltage": "25.6 V",
      "Rated Capacity": "100 Ah (2.56 kWh)",
      "Cycle Life": "5,000+ Cycles",
      "Weight": "approx. 22 kg (70% lighter than tubular lead-acid)",
      "Protection": "Over-charge, over-discharge & high-temp cut-off",
    },
    highlights: [
      "Charges 3x faster than standard lead-acid tubular batteries",
      "No acid fumes, no water top-up, 100% safe indoor placement",
      "Provides consistent voltage until fully discharged",
      "Compatible with major branded 24V inverter models",
    ],
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "inverter-hybrid-5kw",
    name: "VLOXIA NextGen Hybrid Solar Inverter 5 kW",
    tagline: "All-in-one smart inverter with dual MPPT and lithium battery auto-sync",
    category: "power-solar",
    categoryLabel: "Power & Solar",
    price: 64000,
    originalPrice: 72000,
    rating: 4.9,
    reviewsCount: 31,
    inStock: true,
    warranty: "5 Years Standard Warranty",
    specs: {
      "Continuous Rating": "5 kW Pure Sine Wave",
      "MPPT Voltage Range": "120V – 450V DC",
      "Max Solar Array": "6,500 Watts",
      "Battery Support": "48V / 51.2V Lithium & Tubular",
      "Transfer Time": "< 10ms (Zero computer reset)",
    },
    highlights: [
      "Simultaneous solar, grid, and battery power sharing",
      "Export to grid option with bi-directional net-metering compatibility",
      "Wi-Fi dongle included for live smartphone monitoring",
      "Pure sine wave output safe for sensitive electronics",
    ],
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    badge: "Smart Hybrid",
  },
];
