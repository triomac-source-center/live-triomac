// components/ProductTable.jsx

import { useState,  useEffect} from "react";
import { Para } from './../../para'

export default function ProductTable({ products }) {

    const [data, setData] = useState()

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
      <div className="w-full max-w-2xl mx-auto p-1">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="">
                <th className="text-left p-1 text-xx font-medium text-gray-300">Name</th>
                <th className="text-right p-1 text-xs font-medium text-gray-300">Price</th>
              </tr>
            </thead>
            <tbody>
              { data != null ? data.map((item, index) => (
                <tr key={index} className="border-t border-gray-800">
                  <td className="p-1 text-xs text-gray-300">{item.packetname}</td>
                  <Para classe="p-1 text-xs text-gray-300 text-right" param1={item.differencevalue}>{item.recordvalue}</Para>
                </tr>
              )): <tr key="load"><td>Loading..</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  