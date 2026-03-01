export type VehicleType = {
  sedan: { price: number; estimatedTime: string };
  truck: { price: number; estimatedTime: string };
  suvTwoRows: { price: number; estimatedTime: string };
  suvThreeRows: { price: number; estimatedTime: string };
};

export type DetailMenuItem = {
  id?: number;
  packageName: string;
  startingPrice: string;
  estimatedTime: string;
  services: {
    interior?: string[];
    exterior?: string[];
  };
  vehicleType: VehicleType;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  additionalComments: string;
};

export type BookingInfo = {
  selectedVehicle: string;
  selectedPackage: any;
  selectedDate: string;
  selectedTime: string;
  userInfo: UserInfo;
};


export type QuizAnswers = {
  lastDetail: string;
  mainConcern: string;
  budget: string;
};
