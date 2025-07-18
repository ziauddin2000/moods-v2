export type DataItem = {
    name: string;
    price: string;
    type: string;
  };
  
export  type ChartDataItem = {
    name: string;
    price: number;
    type: string;
  };


 export type PieData = {
    name: string;
    value: number;
  };

 export type ClientFlowData = {
    name: string;
    "New Clients": number;
    "Outflow Clients": number;
  };
  

 export type BillChartData = {
    name: string;
    data1: number;
    data2: number;
  };