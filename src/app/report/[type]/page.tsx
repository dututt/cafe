import Chart from "@/components/chart";
import React from "react";

type IProps = {
  params: { type: string };
};

function ReportPage({ params }: IProps) {
  return (
    <div className="border">
      <Chart reportBy={params.type} />
    </div>
  );
}

export default ReportPage;
