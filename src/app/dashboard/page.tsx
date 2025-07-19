"use client";

import BillChart from "./_components/billChart";
import ClientFlow from "./_components/clientFlow";
import HomeCalendar from "./_components/homeCalendar";
import PieChartComp from "./_components/pieChart";
import ResultChart from "./_components/resultChart";
import StartSession from "./_components/startSession";

export default function Dashboard() {
  return (
    <div className="py-5 lg:py-10 grid grid-cols-1 xl:grid-cols-12 gap-3">
      {/* Left  */}
      <div className="w-full xl:col-span-4">
        <ResultChart />
      </div>
      {/* Middle  */}
      <div className="xl:col-span-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-5">
          <div className="md:col-span-8 h-full">
            <HomeCalendar />
          </div>
          <div className="md:col-span-4">
            <PieChartComp />
          </div>
        </div>
        <ClientFlow />
      </div>
      {/* Right  */}
      <div className="xl:col-span-2 flex flex-col md:flex-row xl:flex-col gap-5 justify-between">
        <StartSession />
        <div className="md:w-[50%] xl:w-full xl:h-full">
          <BillChart />
        </div>
      </div>
    </div>
  );
}
