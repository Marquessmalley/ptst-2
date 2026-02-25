import { detailMenu } from '@/lib/data/placeholder-data';

type VehicleType = 'sedan' | 'truck' | 'suv-2-rows' | 'suv-3-rows';

const vehicleLabels: Record<VehicleType, string> = {
  sedan: 'Sedan',
  truck: 'Truck',
  'suv-2-rows': 'SUV (2 rows)',
  'suv-3-rows': 'SUV (3 rows)',
};

const vehicleKeyMap: Record<
  VehicleType,
  keyof (typeof detailMenu)[0]['vehicleType']
> = {
  sedan: 'sedan',
  truck: 'truck',
  'suv-2-rows': 'suvTwoRows',
  'suv-3-rows': 'suvThreeRows',
};

export function buildRecommenderPrompt(
  vehicleType: VehicleType,
  lastDetail: string,
  mainConcern: string,
  budget: string,
): string {
  const vehicleLabel = vehicleLabels[vehicleType];
  const dataKey = vehicleKeyMap[vehicleType];

  const packagesBlock = detailMenu
    .map((pkg) => {
      const vehicleInfo = pkg.vehicleType[dataKey];
      const included = [
        ...(pkg.services.interior || []),
        ...(pkg.services.exterior || []),
      ].join(', ');

      return `- ${pkg.packageName}: $${vehicleInfo.price} (${vehicleInfo.estimatedTime})\n  Services: ${included}`;
    })
    .join('\n\n');

  return `You are a package recommendation assistant for Paul & Tev Shine Time, a mobile auto detailing business.

Given the following customer profile:
- Vehicle: ${vehicleLabel}
- Last professional detail: ${lastDetail}
- Main concern: ${mainConcern}
- Budget: ${budget}

And the following available packages (priced for a ${vehicleLabel}):

${packagesBlock}

Recommend 1-2 packages. For each recommendation, include:
- Package name (must exactly match one of the package names listed above)
- Price for their vehicle
- A 1-2 sentence explanation of why this package fits their needs

If their budget doesn't match any suitable package, recommend the closest option and briefly explain the value. Always recommend the best fit first.

Respond ONLY with valid JSON in this exact format:
{
  "recommendations": [
    {
      "packageName": "...",
      "price": "...",
      "reason": "..."
    }
  ]
}`;
}
