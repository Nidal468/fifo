'use client'

import { useEffect, useState } from "react"

export default function Sidebar(props: any) {
    const [value, setValue] = useState(0)
    const { onSelect } = props;
    useEffect(() => {
        if (onSelect) {
            onSelect(value);
        }
    }, [value]);

    return (
        <div className="w-[250px] h-full border-r border-zinc-300 flex flex-col items-start justify-start p-[20px] gap-[20px]">
            <div className="w-full flex items-center text-[18px] text-bold">
                <h1>Client Dashboard</h1>
            </div>
            <div className="w-full flex flex-col gap-[10px]">
                <div className="w-full h-[40px] rounded-[4px] pl-[10px] flex items-center text-zinc-400 text-[16px]" style={{ background: value === 0 ? '#212121' : "", color: value === 0 ? '#fff' : '' }} onClick={() => setValue(0)}>
                    <h1>Balance sheet</h1>
                </div>
                <div className="w-full h-[40px] rounded-[4px] pl-[10px] flex items-center text-zinc-400 text-[16px]" style={{ background: value === 1 ? '#212121' : "", color: value === 1 ? '#fff' : '' }} onClick={() => setValue(1)}>
                    <h1>Notifications</h1>
                </div>
                <div className="w-full h-[40px] rounded-[4px] pl-[10px] flex items-center text-zinc-400 text-[16px]" style={{ background: value === 2 ? '#212121' : "", color: value === 2 ? '#fff' : '' }} onClick={() => setValue(2)}>
                    <h1>FAQ</h1>
                </div>
                <div className="w-full h-[40px] rounded-[4px] pl-[10px] flex items-center text-zinc-400 text-[16px]" style={{ background: value === 3 ? '#212121' : "", color: value === 3 ? '#fff' : '' }} onClick={() => setValue(3)}>
                    <h1>Learn more</h1>
                </div>
                <div className="w-full h-[40px] rounded-[4px] pl-[10px] flex items-center text-zinc-400 text-[16px]" style={{ background: value === 4 ? '#212121' : "", color: value === 4 ? '#fff' : '' }} onClick={() => setValue(4)}>
                    <h1>Support</h1>
                </div>
                <div className="w-full h-[40px] rounded-[4px] pl-[10px] flex items-center text-zinc-400 text-[16px]" style={{ background: value === 5 ? '#212121' : "", color: value === 5 ? '#fff' : '' }} onClick={() => setValue(5)}>
                    <h1>Settings</h1>
                </div>
                <div className="w-full h-[40px] rounded-[4px] pl-[10px] flex items-center text-red-400 text-[16px]" style={{ background: value === 6 ? '#212121' : "", color: value === 6 ? '#fff' : '' }} onClick={() => setValue(6)}>
                    <h1>Logout</h1>
                </div>
            </div>
        </div>
    )
}