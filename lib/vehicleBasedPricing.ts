// vehicle-based dynamic pricing

export const vehicleBasedPricing = (selectedVehicle: string, data: any) => {
  // Loops through all services
  // filter the variations by selected vehicle
  // return the service data along with the variations  that pass the variation check

  const adjustedPricing = data.data.map((item: any) => {
    const filteredVariation = item.itemData.variations.filter(
      (variation: any) => variation.itemVariationData.name === selectedVehicle
    );

    return {
      ...item.itemData,
      variations: filteredVariation,
    };
  });

  return adjustedPricing;
};
