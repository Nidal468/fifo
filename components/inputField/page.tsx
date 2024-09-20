'use client'

import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { Input, Tooltip } from "rizzui";

type InputType = {
    edit: boolean,
    disabled: boolean,
    info?: { label: string, information: string },
    label?: string,
    value: string | number,
    type: "number" | "search" | "text" | "email" | "tel" | "url" | "time" | "date" | "week" | "month" | "datetime-local" | undefined,
    placeholder?: string,
    width: string | number
}


export default function InputField({
    edit,
    disabled,
    info,
    label,
    value,
    type,
    placeholder,
    width
}: InputType) {

    const [isDisabled, setDisabled] = useState<boolean>(disabled);
    const [isValue, setValue] = useState<string | number>(value);
    return (
        <div className="flex flex-col gap-[20px]" style={{ width: width }}>
            <div className="w-full items-center justify-between flex items-center justify-between">
                <h1>{label}</h1>
                {info && <div className='flex items-center justify-between gap-[10px]'>
                    <p className='text-zinc-400 font-medium text-[12px]'>{info.label}</p>
                    <Tooltip content={info.information} placement='right'>
                        <InfoIcon className='text-zinc-400 text-[16px]' />
                    </Tooltip>
                </div>}
            </div>
            <div className='flex items-center justify-between gap-[10px]'>
                <div className='w-full'>
                    <Input type={type} value={isValue} disabled={isDisabled} placeholder={placeholder} width={'100%'} onChange={(e) => setValue(e.target.value)} />
                </div>
                {edit && <div className='w-[45px] h-[40px] rounded-[4px] flex items-center justify-center' style={{ background: '#4682B41A' }} onClick={() => setDisabled(e => !e)}>
                    <img src='/images/assets/edit.png' width="60%" />
                </div>}
            </div>
        </div>
    )
}