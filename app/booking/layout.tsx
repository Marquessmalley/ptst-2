// "use client";
// import React, { useState, useEffect } from "react";
import StepperProvider from "@/context/StepperContext";

const BookingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <StepperProvider>{children}</StepperProvider>
    </div>
  );
};

export default BookingLayout;
