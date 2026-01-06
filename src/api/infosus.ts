import { api } from "./client";

export const getInfosusList = async (year?: number) => {
  const res = await api.get("/infosus", {
    params: year ? { year } : undefined
  });
  return res.data;
};
