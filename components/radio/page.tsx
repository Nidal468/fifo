'use client'

import { useEffect, useState } from "react"

export function Radio({ data, onSelect }: any) {
    const [isSelected, setIsSelected] = useState(0);

    useEffect(() => {
        if (onSelect) {
            onSelect(isSelected);
        }
    }, [isSelected]);

    return (
        <div className="flex flex-col gap-[30px]">
            {data?.map((item: any, index: number) => {
                return (
                    <div className="flex gap-[10px] cursor-pointer items-center" key={index} onClick={() => setIsSelected(index)}>
                        <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center bg-white" style={{border: isSelected === index? '1px solid #FF7352':''}}>
                            {isSelected === index && <div className="w-[12px] h-[12px] rounded-full" style={{background: '#FF7352'}}></div>}
                        </div>
                        <div className="h-[18px] text-[14px] flex items-center"><h1>{item.name}</h1></div>
                    </div>
                )
            })}
        </div>
    )
}
export function Radio1({ data, onSelect }: any) {
    const [isSelected, setIsSelected] = useState(0);

    useEffect(() => {
        if (onSelect) {
            onSelect(isSelected);
        }
    }, [isSelected]);

    return (
        <div className="flex flex-col gap-[20px]">
            {data?.map((item: any, index: number) => {
                return (
                    <div className="flex gap-[10px] cursor-pointer items-start justify-start" key={index} onClick={() => setIsSelected(index)}>
                        <div className="w-[18px] h-[18px] rounded-full border border-zinc-400 flex items-center justify-center">
                            {isSelected === index && <div className="w-[16px] h-[16px] rounded-full border-4 border-blue-500"></div>}
                        </div>
                        <div className="w-full text-[14px] flex flex-col items-start justify-center border p-[5px] gap-[10px]">
                            <div>{item.name}</div>
                            <div>Total fee: {item.fee}</div>
                            <div>You receive: {item.receive}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
