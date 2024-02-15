import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchCoinPriceHistory } from "../api";
import ApexChart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["coinPriceHistory", coinId],
    () => fetchCoinPriceHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : data && data?.length ? (
        <ReactApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data:
                data.map((price) => ({
                  x: new Date(parseInt(price.time_close) * 1000),
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [],
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              labels: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            dataLabels: {
              style: {
                colors: ["#F44336", "#E91E63", "#9C27B0"],
              },
            },
            tooltip: {
              theme: "dark",
            },
          }}
        />
      ) : (
        "Could not get the price data..."
      )}
    </div>
  );
};

export default Chart;
