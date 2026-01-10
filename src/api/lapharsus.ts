import { api } from "./client";


export const getLapharsusList = async (
  year?: number,
  limit: number = 20,
  offset: number = 0
) => {
  const res = await api.get("/lapharsus", {
    params: {
      year,
      limit,
      offset
    }
  });

  return res.data;
};

export const createLapharsus = async (payload: any) => {
  const res = await api.post("/lapharsus", payload);
  return res.data;
};


export const getLatestNumber = async () => {
  const res = await api.get("/lapharsus/latest-record");
  return res.data
}
