import { useEffect, useState } from "react";

function YList(){
    
        const [YList, setyList] = useState([])

    useEffect(() => {
        let year = new Date().getFullYear();
        const ly = year - 29;
        let i = 1
        let arr = []
        for (year; year >= ly; year--) {


            let privyear = year.toString().slice(-2);
            let last = year - 1 + "-" + privyear;
            last = last.toString();
            const obj = {
                id: [i],
                value: last
            }
            arr.push(obj)
            i++
        }
        setyList(arr)
    }, [])
    return YList;
}
export default YList;