'use client'
import { useEffect, useState } from "react"
import { create } from "./action";


export function Test() {
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const updateData = async () => {
            if (counter > 3) {
                console.log("yo it's done")
                create('yooo its sent')
            }
        }
    })

    async function hello() {
        console.log('hello')
        setCounter(counter + 1)
        test({counter});
        const message = await create({ counter })

    }

    function handleClick() {
        console.log(counter)
        setCounter(counter + 1)
    }
    
    return (
        <>
            Hello
            <button className='btn' onClick={() => hello()}>Test</button>
            {counter}
        </>
    )
}