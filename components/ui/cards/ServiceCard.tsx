import Image from 'next/image';
import React from 'react';

const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="rounded-3xl bg-gradient-to-b from-sky-400 to-orange-400 p-px">
      <div className="rounded-[calc(1.5rem-1px)] bg-gray-50 p-4">
        <div className="h-10 w-10 rounded-full bg-sky-400 p-3">
          <Image role="img" src={icon} alt="" width={20} height={26} />
        </div>
        <h3 className="py-2 text-lg font-bold">{title}</h3>
        <p className="text-sm font-normal text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
