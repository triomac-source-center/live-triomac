import { useEffect, useState } from "react"

export function Para({param1, children , classe}) {

    const [visualColor, setVisualColor] = useState('#26A69A')
    useEffect(()=> {
         parseFloat(param1) >= 0 ? setVisualColor('#26A69A') : setVisualColor('#EF5350') 
    }, [param1])

  return  (
    <>
    < td className={classe} style={{color: visualColor}}>
        {children}
    </td>
    </>
  )
}
