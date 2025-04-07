"use client"

import { useEffect, useState } from "react"
import { Para } from "./para";
import SkeletonLayout from "./skeleton";
import Link from "next/link";

const transactions = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    share: 'CAC',
    commission: '+$4.37',
    price: '$3,509.00',
    quantity: '12.00',
    netAmount: '$4,397.00',
  },
  { id: 'AAPS1L', company: 'Chase & Co.', share: 'CAC', commission: '+$5.22', price: '$3,800.00', quantity: '10.00', netAmount: '$3,825.00', },
  { id: 'AAPS2L', company: 'Chase & Co.', share: 'CAC', commission: '+$4.97', price: '$3,215.00', quantity: '15.00', netAmount: '$4,495.00', },
  { id: 'AAPS3L', company: 'Chase & Co.', share: 'CAC', commission: '+$3.87', price: '$3,650.00', quantity: '8.00', netAmount: '$3,729.00', },
  { id: 'AAPS4L', company: 'Chase & Co.', share: 'CAC', commission: '+$6.42', price: '$3,990.00', quantity: '13.00', netAmount: '$4,612.00', },
  { id: 'AAPS5L', company: 'Chase & Co.', share: 'CAC', commission: '+$4.10', price: '$3,720.00', quantity: '14.00', netAmount: '$4,274.00', },
  { id: 'AAPS6L', company: 'Chase & Co.', share: 'CAC', commission: '+$3.75', price: '$3,450.00', quantity: '11.00', netAmount: '$3,841.00', },
  { id: 'AAPS7L', company: 'Chase & Co.', share: 'CAC', commission: '+$5.80', price: '$3,880.00', quantity: '9.00', netAmount: '$4,048.00', },
  { id: 'AAPS8L', company: 'Chase & Co.', share: 'CAC', commission: '+$4.25', price: '$3,60=0.00', quantity: '16.00', netAmount: '$4,715.00', },
  { id: 'AAPS9L', company: 'Chase & Co.', share: 'CAC', commission: '+$6.10', price: '$3,950.00', quantity: '7.00', netAmount: '$4,057.00', },
  { id: 'AAPSL0', company: 'Chase & Co.', share: 'CAC', commission: '+$3.92', price: '$3,770.00', quantity: '12.00', netAmount: '$4,107.00', },
  { id: 'AAPSL1', company: 'Chase & Co.', share: 'CAC', commission: '+$4.57', price: '$3,695.00', quantity: '10.00', netAmount: '$4,215.00', },
  { id: 'AAPSL2', company: 'Chase & Co.', share: 'CAC', commission: '+$5.62', price: '$3,840.00', quantity: '8.00', netAmount: '$3,958.00', },
  { id: 'AAPSL3', company: 'Chase & Co.', share: 'CAC', commission: '+$4.87', price: '$3,550.00', quantity: '14.00', netAmount: '$4,725.00', },
  { id: 'AAPSL4', company: 'Chase & Co.', share: 'CAC', commission: '+$5.00', price: '$3,920.00', quantity: '11.00', netAmount: '$4,476.00', },
  { id: 'AAPSL5', company: 'Chase & Co.', share: 'CAC', commission: '+$6.12', price: '$3,825.00', quantity: '9.00', netAmount: '$4,085.00', }
]

const datas = []

export default function Board() {

  const [data, setData] = useState(null);
  const [values, setValues] = useState(null);
  const [error, setError] = useState(null);
  const [visualColor, setVisualColor] = useState('black')

  const handleVisualColor = (param) => {
    parseFloat(param) >= 0 ? setVisualColor('green') : setVisualColor('red')
  }

  useEffect(() => {

    const fetchData = async () => {

      try {
        const response = await fetch("https://live-server-triomac.onrender.com/api/get");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }

      
      
    };
    
   
    fetchData();

    const interval = setInterval(fetchData, 1000); // Fetch every 1 second
    return () => clearInterval(interval);

  }, []);
   
  
 
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-white">Transactions</h1>
          <p className="mt-2 text-sm text-emerald-700">
            realtime release
          </p>
          <p className="text-xs text-gray-500"> 
            {data != null ? data[0].recordvalue : <SkeletonLayout></SkeletonLayout>}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {/* <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export
          </button> */}
          <p className="block rounded-md  px-3 py-2 text-center text-sm font-semibold text-gray-500 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            Triomac 60
          </p>
          <Link href="/realtime">
          <p className="block rounded-sm hover:text-red-400 bg-slate-800  px-1 py-1 text-center text-xs font-semibold text-red-200 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            Tradingview
          </p>
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-700 ">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-400 sm:pl-0"
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-400"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-400"
                  >
                    Share
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-400"
                  >
                    Commision
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-400"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-400"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-400"
                  >
                    Net amount
                  </th>
                  <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-transparent">
                {data != null ? data.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap py-1 pl-4 pr-3 text-xs text-gray-500 sm:pl-0">{transactions[0].id}</td>
                    <td className="whitespace-nowrap px-2 py-1 text-xs font-medium text-gray-400">
                      {transaction.packetname}
                    </td>
                    <td className="whitespace-nowrap px-2 py-1 text-xs text-gray-400">{transactions[0].share}</td>
                    <td className="whitespace-nowrap px-2 py-1 text-xs text-gray-500">{transactions[0].commission}</td>
                    <Para classe="whitespace-nowrap px-2 py-1 text-xs text-gray-100" param1={transaction.differencevalue}>
                    {
                        transaction.recordvalue
                      }
                    </Para>
                    {/* <td style={{color: visualColor}} className="">
                      {
                        transaction.recordvalue
                      }
                    </td> */}
                    {/* <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.recordpercentage}</td> */}
                    <Para classe="whitespace-nowrap px-2 py-1 text-xs text-gray-100" param1={transaction.differencevalue}>{transaction.recordpercentage}</Para>
                    <Para classe="whitespace-nowrap px-2 py-1 text-xs text-gray-100" param1={transaction.differencevalue}>{transaction.differencevalue}</Para>
                    {/* <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{transaction.differencevalue}</td> */}
                    <td className="relative whitespace-nowrap py-1 pl-3 pr-4 text-right text-xs font-medium sm:pr-0">
                      <a href="#" className="text-lime-600 hover:text-slate-900">
                        active<span className="sr-only">, {transaction.id}</span>
                      </a>
                    </td>
                  </tr>
                )) : <SkeletonLayout></SkeletonLayout>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
