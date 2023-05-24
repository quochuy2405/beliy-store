import AxiosServices from './AxiosServices'

export const getProvinces = async () => {
  return await AxiosServices.get<Array<any>>(
    'https://api.viamichelin.com/geocoding/1.0/reverse?lat=0&lon=0&locality=country_code:VN&filter=administrative_area'
  )
}

export const getDistrict = async (provinceId: string) => {
  return await AxiosServices.get(
    `https://api.viamichelin.com/geocoding/1.0/reverse?lat=0&lon=0&locality=country_code:VN&filter=admin_level:2|administrative_area:${provinceId}`
  )
}

export const getAwards = async (districtId: string) => {
  return await AxiosServices.get(
    `https://api.viamichelin.com/geocoding/1.0/reverse?lat=0&lon=0&locality=country_code:VN&filter=admin_level:3|administrative_area:${districtId}`
  )
}
