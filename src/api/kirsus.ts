import { api } from "./client";

export const getKirsusList = async (
  year?: number,
  limit: number = 20,
  offset: number = 0
) => {
  const res = await api.get("/kirsus", {
    params: {
      year,
      limit,
      offset
    }
  });

  return res.data;
};

export const createKirsus = async (payload: any) => {
  const res = await api.post("/kirsus", payload);
  return res.data;
};


export const getLatestNumber = async () => {
  const res = await api.get("/kirsus/latest-record");
  return res.data
}
