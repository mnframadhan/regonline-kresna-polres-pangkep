import { api } from "./client";

export const getKirkatList = async (year?: number) => {
  const res = await api.get("/kirkat", {
    params: year ? { year } : undefined
  });
  return res.data;
};

export const createKirkat = async (payload: any) => {
  const res = await api.post("/kirkat", payload);
  return res.data;
};

export const getLatestNumber = async () => {
  const res = await api.get("/kirkat/latest-record");
  return res.data
}
