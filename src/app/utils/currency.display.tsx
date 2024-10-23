import React from "react";

const CurrencyDisplay: React.FC<{ amount: number }> = ({ amount }) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return <>{formatter.format(amount)}</>;
};

export default CurrencyDisplay;
