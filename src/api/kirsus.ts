import { api } from "./client";

export const getKirsusList = async (year?: number) => {
  const res = await api.get("/kirsus", {
    params: year ? { year } : undefined
  });
  return res.data;
};

export const createKirsus = async (payload: any) => {
  const res = await api.post("/kirsus", payload);
  return res.data;
};
