export const services = [
  {
    id: 0,
    icon: "/wash.png",
    title: "Full Detail",
    description:
      "Our full auto cleaning detailing service is designed to give your vehicle a complete makeover, both inside and out.",
  },
  {
    id: 1,
    icon: "/wash.png",
    title: "Interior Detail",
    description:
      "Experience a spotless and inviting cabin with our Interior Detailing service.",
  },
  {
    id: 2,
    icon: "/wash.png",
    title: "Exterior Detail",
    description:
      "Make your car stand out with our Exterior Detailing service, designed to restore and protect your vehicle’s exterior.",
  },
];

export const faq = [
  {
    id: 0,
    question: "What is included in a detailing package?",
    answer:
      "Our detailing packages typically include services such as interior vacuuming, dashboard and cup holder cleaning, window cleaning, hand washing and drying of the exterior, rim and tire cleaning, and waxing. Specific services may vary by package level (Bronze, Silver, Gold).",
  },
  {
    id: 1,
    question: "What is included in a detailing package?",
    answer:
      "Our detailing packages typically include services such as interior vacuuming, dashboard and cup holder cleaning, window cleaning, hand washing and drying of the exterior, rim and tire cleaning, and waxing. Specific services may vary by package level (Bronze, Silver, Gold).",
  },
  {
    id: 2,
    question: "What is included in a detailing package?",
    answer:
      "Our detailing packages typically include services such as interior vacuuming, dashboard and cup holder cleaning, window cleaning, hand washing and drying of the exterior, rim and tire cleaning, and waxing. Specific services may vary by package level (Bronze, Silver, Gold).",
  },
  {
    id: 3,
    question: "What is included in a detailing package?",
    answer:
      "Our detailing packages typically include services such as interior vacuuming, dashboard and cup holder cleaning, window cleaning, hand washing and drying of the exterior, rim and tire cleaning, and waxing. Specific services may vary by package level (Bronze, Silver, Gold).",
  },
  {
    id: 4,
    question: "What is included in a detailing package?",
    answer:
      "Our detailing packages typically include services such as interior vacuuming, dashboard and cup holder cleaning, window cleaning, hand washing and drying of the exterior, rim and tire cleaning, and waxing. Specific services may vary by package level (Bronze, Silver, Gold).",
  },
];

export const detailMenu = [
  {
    id: 0,
    packageName: "Bronze Package",
    startingPrice: "$80",
    estimatedTime: "2h",
    services: {
      interior: [
        "Interior Vaccum",
        "Dashboard + Cup Holders + Vents",
        "Windows In & Out",
        "Thorough Wipedown Of All Cracks & Crevices",
      ],
      exterior: [
        "Foam Bath/ Hand Wash",
        "Hand Dry",
        "Clean & Shine Rims",
        "Tire Scrub & Shine",
        "Door Jams & Trunk Jams",
        "Spray Wax",
      ],
    },
    vehicleType: {
      sedan: {
        price: 80,
        estimatedTime: "1h 20m",
      },
      truck: {
        price: 100,
        estimatedTime: "1h 45m",
      },
      suvTwoRows: {
        price: 100,
        estimatedTime: "1h 45m",
      },
      suvThreeRows: {
        price: 110,
        estimatedTime: "1h 50m",
      },
    },
  },
  {
    id: 1,
    packageName: "Gold Package",
    startingPrice: "$250",
    estimatedTime: "4h 30m",
    services: {
      interior: [
        "Interior Vaccum",
        "Deep Cleanse Between Cracks & Crevices",
        "Leather & Vinyl Cleaning",
        "Leather Conditioning",
        "Deep Carpet & Seat Shampoo",
        "Mirror & Window Cleaning",
        "Odor Elimination",
        "Air Vent Steamed & Cleaned",
      ],
      exterior: [
        "Foam Bath/ Hand Wash",
        "Hand Dry",
        "Clay Bar & Paint Decontamination",
        "Tire Scrub & Shine",
        "Rims Clean & Shine",
        "Windows",
        "Wax/Sealant",
        "Trim Restore",
      ],
    },
    vehicleType: {
      sedan: {
        price: 250,
        estimatedTime: "4h",
      },
      truck: {
        price: 280,
        estimatedTime: "4h 30m",
      },
      suvTwoRows: {
        price: 280,
        estimatedTime: "4h 30m",
      },
      suvThreeRows: {
        price: 300,
        estimatedTime: "4h 30m",
      },
    },
  },
  {
    id: 2,
    packageName: "Silver Package",
    startingPrice: "$175",
    estimatedTime: "4h",
    services: {
      interior: [
        "Interior Vaccum",
        "Deep Cleanse Between Cracks & Crevices",
        "Leather & Vinyl Cleaning",
        "Leather Conditioning",
        "Deep Carpet & Seat Shampoo",
        "Mirror & Window Cleaning",
        "Odor Elimination",
        "Air Vent Steamed & Cleaned",
      ],
      exterior: [
        "Foam Bath/ Hand Wash",
        "Hand Dry",
        "Clay Bar & Paint Decontamination",
        "Tire Scrub & Shine",
        "Rims Clean & Shine",
        "Windows",
        "Wax/Sealant",
      ],
    },
    vehicleType: {
      sedan: {
        price: 175,
        estimatedTime: "3h 20m",
      },
      truck: {
        price: 185,
        estimatedTime: "3h 40m",
      },
      suvTwoRows: {
        price: 185,
        estimatedTime: "3h 40m",
      },
      suvThreeRows: {
        price: 205,
        estimatedTime: "3h 40m",
      },
    },
  },

  {
    id: 3,
    packageName: "Min Interior Detail",
    startingPrice: "$60",
    estimatedTime: "1h",
    services: {
      interior: [
        "Interior Vaccum",
        "Dashboard + Center Console",
        "Door Panels",
        "Leather Clean & Condition",
        "Light Interior Dressing",
        "Steam Clean Panels & Trims",
      ],
    },
    vehicleType: {
      sedan: {
        price: 60,
        estimatedTime: "1h",
      },
      truck: {
        price: 65,
        estimatedTime: "1h",
      },
      suvTwoRows: {
        price: 65,
        estimatedTime: "1h",
      },
      suvThreeRows: {
        price: 70,
        estimatedTime: "1h 40m",
      },
    },
  },
  {
    id: 4,
    packageName: "Full Interior Detail",
    startingPrice: "$150",
    estimatedTime: "3h",
    services: {
      interior: [
        "Interior Vaccum",
        "Dashboard + Center Console",
        "Door Panels",
        "Leather Clean & Condition",
        "Light Interior Dressing",
        "Steam Clean Panels & Trims",
        "Headliner Cleaning",
        "Shampoo Seats & Carpet",
      ],
    },
    vehicleType: {
      sedan: {
        price: 150,
        estimatedTime: "3h",
      },
      truck: {
        price: 160,
        estimatedTime: "3h",
      },
      suvTwoRows: {
        price: 160,
        estimatedTime: "3h",
      },
      suvThreeRows: {
        price: 180,
        estimatedTime: "3h",
      },
    },
  },
  {
    id: 5,
    packageName: "Premium Wash & Wax",
    startingPrice: "$100",
    estimatedTime: "1h 30m",
    services: {
      exterior: [
        "Foam Bath/ Hand Wash",
        "Clay Bar",
        "Paint Decontamination",
        "Tire Shine",
        "Wax/Sealant Application",
        "Windows",
      ],
    },
    vehicleType: {
      sedan: {
        price: 100,
        estimatedTime: "1h 30m",
      },
      truck: {
        price: 120,
        estimatedTime: "1h 30m",
      },
      suvTwoRows: {
        price: 120,
        estimatedTime: "1h 30m",
      },
      suvThreeRows: {
        price: 140,
        estimatedTime: "1h 30m",
      },
    },
  },
];

export const bookingSteps = [
  "Select Vehicle",
  "Select Package",
  "Date & Time",
  "Booking Summary",
];
