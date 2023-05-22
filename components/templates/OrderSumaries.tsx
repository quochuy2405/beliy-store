import { ProductType } from '@/types/product'
import clsx from 'clsx'
import Link from 'next/link'
interface OrderSumariesProps {
  orders: ProductType[]
}
const OrderSumaries: React.FC<OrderSumariesProps> = ({ orders }) => {
  return (
    <div className="h-auto max-w-5xl m-auto pt-10">
      <h1 className="mb-10 text-2xl font-bold">Giỏ hàng</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {orders.map((item) => (
            <div
              key={item.id}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <div className="h-44 w-36 overflow-hidden rounded-lg  bg-[url('/JACKET4-2.png')] bg-cover bg-no-repeat"></div>
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                  <div className="flex  items-center gap-2">
                    {item.sizes.map((size) => (
                      <p
                        className={clsx(
                          'w-6 h-6 rounded-full border-2 cursor-pointer border-black flex items-center text-black justify-center font-bold text-[9px]'
                        )}
                      >
                        {size}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-black">
                      {' '}
                      -{' '}
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="text"
                      defaultValue={2}
                      readOnly
                    />
                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-black">
                      {' '}
                      +{' '}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {(item.quantity * item.price * 1000).toLocaleString()} VND
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Tổng</p>
            <p className="text-gray-700">300.000đ</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Phí ship</p>
            <p className="text-gray-700">30.000đ</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Tổng tiền</p>
            <div>
              <p className="mb-1 text-lg font-bold">330.000đ</p>
              <p className="text-sm text-gray-700">Đã bao gồm VAT</p>
            </div>
          </div>
          <Link href="/payment">
            <button className="mt-6 w-full rounded-md bg-gray-900 py-1.5 font-medium text-white hover:bg-black">
              Thanh toán
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSumaries
