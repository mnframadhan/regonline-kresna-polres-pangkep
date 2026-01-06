import { api } from "./client";

export const getLapharsusList = async (year?: number) => {
  const res = await api.get("/lapharsus", {
    params: year ? { year } : undefined
  });
  return res.data;
};

export const createLapharsus = async (payload: any) => {
  const res = await api.post("/lapharsus", payload);
  return res.data;
};
