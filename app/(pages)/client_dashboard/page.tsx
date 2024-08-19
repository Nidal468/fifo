'use client'

import Notifications from "@/components/notification/page";
import Sidebar from "@/components/sidebar/page";
import { useEffect, useState } from "react"

export default function Clientdashboard() {
    const [selected, setSelected] = useState(0)
    const value = (selectedIndex: number) => {
        setSelected(selectedIndex)
    };
    console.log(selected)
    return (
        <div className="w-full h-[100vh] flex items-center justify-start">
            <Sidebar onSelect={value}/>
            <div className="h-full flex" style={{ width: 'calc(100% - 250px)' }}>
                {selected === 1 && <Notifications />}
            </div>
        </div>
    )
}