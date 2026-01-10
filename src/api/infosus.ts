import { api } from "./client";

export const getInfosusList = async (
  year?: number,
  limit: number = 20,
  offset: number = 0
) => {
  const res = await api.get("/infosus", {
    params: {
      year,
      limit,
      offset
    }
  });

  return res.data;
};

export const getLatestNumber = async () => {
  const res = await api.get("/infosus/latest-record");
  return res.data
}
