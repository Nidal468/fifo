'use client'

import { Button } from "@/components/button/page";
import DayPickerComponent from "@/components/DayPickerComponent/page";
import Description from "@/components/Description/page";
import Dropzone from "@/components/dropzone/page";
import { Model } from "@/components/model/page";
import { Self_Assessment } from "@/components/Self_Assessment/page";
import { Data } from "@/data/assesments";
import Link from "next/link";
import { useState } from "react";



export default function Idme() {
    const [next, setNext] = useState(0);
    
    const currentData = Data[next];

    const ModelData: { data: JSX.Element, color: string }[] = [
        {
            data: <Self_Assessment 

            reasons={currentData.reasons} 
            action={() => setNext(currentData.index)} 
            children={currentData.children} 
            startData={currentData.startData}
            endDate={currentData.endDate}
            index={currentData.index}
            final={currentData.final}
            />,
            color: ''
        },
        {
            data: <Self_Assessment 

            reasons={currentData.reasons} 
            action={() => setNext(currentData.index)} 
            children={currentData.children} 
            startData={currentData.startData}
            endDate={currentData.endDate}
            index={currentData.index}
            final={currentData.final}
            />,
            color: ''
        },
        {
            data: <Self_Assessment 

            reasons={currentData.reasons} 
            action={() => setNext(currentData.index)} 
            children={currentData.children} 
            startData={currentData.startData}
            endDate={currentData.endDate}
            index={currentData.index}
            final={currentData.final}
            />,
            color: ''
        },
        {
            data: <Upload action={() => setNext(4)} />,
            color: ''
        },
        {
            data: <Fail action={() => setNext(0)} />,
            color: '#F1F2F0'
        }
    ];

    const progressPercentage = ((next + 1) / ModelData.length) * 100;

    return (
        <div className="w-full min-h-[100vh] flex flex-col items-center justify-start gap-[30px]">
            <div className="h-[2px] self-start duration-300" style={{ background: '#FF7352', width: `${progressPercentage}%` }}></div>
            <Model elements={ModelData[next].data} color={ModelData[next].color} />
        </div>
    )
}

function Upload({ action }: { action: () => void }) {



    return (
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            <h1 className="text-[20px]">If you have any documentation supporting any of the dates you have entered, select the files or drag and drop to upload.</h1>
            <Dropzone />
            <h1>All information in this self-assessment must be true and accurate to the best of your knowledge. Any submission of data to the IRS that is known to be false or fraudulent could subject you, the taxpayer, to fines or imprisonment.</h1>
            <div className="w-full flex items-center justify-end gap-[20px]">
                <Button text="Back" clicked={() => { }} width="120px" color="#ffffff" border="2px solid #151515" textColor="#151515" />
                <Button text="Next" clicked={() => { }} width="120px" />
            </div>
        </div>
    )
}

function Fail({ action }: { action: () => void }) {
    return (
        <div className="flex flex-col gap-[20px] font-bold w-[800px]">
            <h1>Thank you for your submission!</h1>
            <p>Based on your answers, you do not qualify for the Sick and Family Leave credit.</p>
            <Button text='Back to fifo.com' width='200px' clicked={() => action()} />
        </div>
    )
}