'use client'

import { useEffect, useState } from "react"


export default function Notifications() {
    const [selected, setSelected] = useState('')
    return (
        <div className="w-full h-full bg-zinc-100">
            <div className="w-full h-[50px] bg-zinc-200">
                <div className="w-[200px] h-full bg-zinc-700 flex items-center justify-center text-white">
                    <h1>Inbox</h1>
                </div>
                {selected === '' && <div className="w-full flex flex-col">
                    <div className="w-full h-[60px] border-b border-zinc-300 flex items-center justify-between px-[10px] gap-[10px]">
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[40px] h-[40px] rounded-full bg-zinc-400"></div>
                            <div className="h-full flex flex-col justify-center">
                                <h1 className="text-[16px]">Fate</h1>
                                <p className="text-[14px]">You won 20000$</p>
                            </div>
                        </div>
                        <h1 className="text-[14px] text-zinc-500">16th June 2024</h1>
                    </div>
                </div>}
                {selected === '1' && <div className="w-full h-full flex flex-col">
                    <div className="w-full h-[60px] flex items-center justify-between p-[10px]">
                        <div className="flex items-center gap-[10px]">
                            <div className="w-[40px] h-[40px] rounded-full bg-zinc-400"></div>
                            <div className="h-full flex flex-col justify-center">
                                <h1 className="text-[16px]">Fate</h1>
                                <p className="text-[14px] text-zinc-500">to me</p>
                            </div>
                        </div>
                        <h1 className="text-[14px] text-zinc-500">16th June 2024</h1>
                    </div>
                    <div className="w-full h-[600px] overflow-auto bg-red-500"></div>
                </div>}
            </div>
        </div>
    )
}