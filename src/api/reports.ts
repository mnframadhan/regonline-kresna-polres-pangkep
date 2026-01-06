import { api } from "./client";

export const getReportsList = async (year?: number) => {
  const res = await api.get("/reports", {
    params: year ? { year } : undefined
  });
  return res.data;
};

export const createReport = async (payload: any) => {
  const res = await api.post("/reports", payload);
  return res.data;
};
