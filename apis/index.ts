import axios from 'axios'

export const getProvinces = async () => {
  return await axios.get<Array<any>>('https://provinces.open-api.vn/api/')
}

export const getDistrict = async (provinceId: string) => {
  return await axios.get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
}

export const getAwards = async (districtId: string) => {
  return await axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
}
