import { api } from "./client";

export const getKirkatList = async (
  year?: number,
  limit: number = 20,
  offset: number = 0
) => {
  const res = await api.get("/kirkat", {
    params: {
      year,
      limit,
      offset
    }
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
