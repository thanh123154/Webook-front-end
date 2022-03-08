import axios from "axios";

const getAllProvinces = async () => {
  const response = await axios.get(
    "https://api.deepcare.vn/address/getAllProvince"
  );

  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

const getAllDistricts = async (code) => {
  const response = await axios.post(
    "https://api.deepcare.vn/address/searchByCode",
    {
      address_type: 1,
      code: code,
    }
  );
  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

const getAllWards = async (code) => {
  const response = await axios.post(
    "https://api.deepcare.vn/address/searchByCode",
    {
      address_type: 2,
      code: code,
    }
  );

  const { status, data } = response.data;

  if (status === "OK") {
    return data;
  }

  return [];
};

const addressGetter = { getAllProvinces, getAllDistricts, getAllWards };

export default addressGetter;
