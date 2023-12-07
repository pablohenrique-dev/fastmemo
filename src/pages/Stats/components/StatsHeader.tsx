import React from "react";

interface StatsHeaderProps {
  totalReviews: number;
  reviewsToday: number;
}

export const StatsHeader = ({
  totalReviews,
  reviewsToday,
}: StatsHeaderProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6 text-white">
      <div className="w-full h-[150px] bg-black"></div>
      <div className="w-full h-[150px] bg-black grid grid-cols-2 rounded-md p-4">
        <div>
          <span className="text-xl">Total:</span>
          <h3 className="text-4xl font-semibold mt-2">
            {totalReviews} revisões
          </h3>
        </div>
        <div>
          <span className="text-xl">Hoje:</span>
          <h3 className="text-4xl font-semibold mt-2">
            {reviewsToday} revisões
          </h3>
        </div>
      </div>
    </div>
  );
};
