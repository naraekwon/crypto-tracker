import { useQuery } from "react-query";
import { fetchCoinPriceHistory } from "../api";
import { IHistorical } from "../types";
import styled from "styled-components";
import { useState } from "react";

interface PriceProps {
  coinId: string;
}

const Table = styled.table`
  width: 440px;
  border: none;
  border-collapse: collapse;

  th,
  td {
    padding: 8px 8px;
    text-align: center;
    text-transform: capitalize;
  }
  th {
    font-weight: 700;
    color: ${(props) => props.theme.accentColor};
  }
  thead > tr {
    background-color: #636e72;
  }
  tbody tr:nth-child(even) {
    background-color: #2d3436;
  }
  tbody tr:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<Partial<IHistorical>[]>(
    ["coinPriceHistory", coinId],
    () => fetchCoinPriceHistory(coinId)
  );

  const columns: (keyof IHistorical)[] = [
    "time_open",
    "open",
    "high",
    "low",
    "close",
  ];

  return (
    <div>
      {isLoading ? (
        "Loading price table..."
      ) : data && data.length ? (
        <Table>
          <thead>
            <tr>
              {columns.map((title) => (
                <th key={title}>{title === "time_open" ? "date" : title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((title, index) => {
                  if (["time_open", "time_close"].includes(title)) {
                    const date = new Date(
                      Number(item[title]) * 1000
                    ).toLocaleDateString();
                    return <td key={index}>{date}</td>;
                  }
                  return <td key={index}>{item[title]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
};

export default Price;
