import React from 'react'

export default function TableOrder() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full w-full table-fixed text-left text-sm font-light border border-white-500">
              <thead className=" bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 w-[3%] py-4">
                    Id
                  </th>
                  <th scope="col" className="px-6 w-[20%] py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 w-[38%]">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </div>
  )
}
