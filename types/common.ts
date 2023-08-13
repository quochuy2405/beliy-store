export type OptionType = {
    label: string
    value: string | number
}

export type OrderType = {
    name: string
    email: string
    award: OptionType
    province: OptionType
    district: OptionType
    phone: string
    addressNumber: string
}
