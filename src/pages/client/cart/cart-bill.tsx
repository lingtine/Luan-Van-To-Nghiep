import React from 'react'
import { Link } from 'react-router-dom'
import { useGetDetailCartQuery } from 'redux/api/cart/cart';
interface BillProps {
    onToogle: (status: boolean) => void;
}

export default function CartBill({onToogle} : BillProps) {
  const {data, isLoading} = useGetDetailCartQuery(null)
    const onclose = () => {
        onToogle(false)
    }
    console.log(data);
    

  return (
    <div
    id="bill"
    className="container flex fixed top-0 right-0   mx-auto mb-20 min-w-[100vw] min-h-screen z-50 transition ease-in-out delay-150"
  >
    <div
   
      className="overlay w-full opacity-50 bg-black/50 z-50 transition ease-in-out delay-150"
    ></div>

    <div className="w-fit max-w-[600px] h-full min-h-[100vh] float-right z-50 bg-white transition ease-in-out delay-150">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        Your Cart
      </h1>
      <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
        <div className="float-right">
          <button>
            Clear
            </button>
        </div>
        <table className="mx-auto">
          <thead>
            <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
              <th className="font-primary font-normal px-6 py-4">
                Product
              </th>
              <th className="font-primary font-normal px-6 py-4">
                Quantity
              </th>
              <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
                Price
              </th>
              <th className="font-primary font-normal px-6 py-4">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-palette-lighter">
            {/* <ListItem /> */}
            <tr className="text-center">
              <td></td>
              <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                Subtotal
              </td>
              <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                <span className="text-xl">
                  15.000.000đ
                </span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="max-w-sm mx-auto space-y-4 px-2">
        <Link
        onClick={() => onclose()}
          to="/cart"
          aria-label="checkout-products"
          className="bg-primary-1 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
        >
          Check Out
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-right"
            className="svg-inline--fa fa-arrow-right fa-w-14 w-4 ml-2 inline-flex"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            ></path>
          </svg>
        </Link>
        <button
        onClick={() => onclose()}
          aria-label="back-to-products"
          className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-left"
            className="svg-inline--fa fa-arrow-left fa-w-14 w-4 mr-2 inline-flex"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            ></path>
          </svg>
          Back To All Products
        </button>
        <Link
          to="/order-history"
          aria-label="checkout-products"
          className="bg-primary-1 text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
        >
          Orders History
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-right"
            className="svg-inline--fa fa-arrow-right fa-w-14 w-4 ml-2 inline-flex"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
    </div>
  )
}
