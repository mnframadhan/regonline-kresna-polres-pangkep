import { api } from "./client";

export const getReportsList = async (
  year?: number,
  limit: number = 20,
  offset: number = 0
) => {
  const res = await api.get("/reports", {
    params: {
      year,
      limit,
      offset
    }
  });

  return res.data;
};

export const createReport = async (payload: any) => {
  const res = await api.post("/reports", payload);
  return res.data;
};

export const reportLatestRecord = async () => {
  const res = await api.get("/reports/latest-record")
  return res.data
}
