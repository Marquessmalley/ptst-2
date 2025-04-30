export type VehicleType = {
  sedan: { price: number; estimatedTime: string };
  truck: { price: number; estimatedTime: string };
  suvTwoRows: { price: number; estimatedTime: string };
  suvThreeRows: { price: number; estimatedTime: string };
};

export type DetailMenuItem = {
  id: number;
  packageName: string;
  startingPrice: string;
  estimatedTime: string;
  services: {
    interior?: string[];
    exterior?: string[];
  };
  vehicleType: VehicleType;
};

export type BookingInfo = {
  selectedVehicle: string;
  selectedPackage: string;
  selectedDateTime: string;
};
