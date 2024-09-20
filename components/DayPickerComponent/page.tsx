'use client'

import { useEffect, useState } from "react";
import { format, differenceInDays, addDays, isValid, isBefore, isAfter } from 'date-fns';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import classNames from "react-day-picker/style.module.css";
// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');

type formData = {
    selectedDays: Date[];
}

export default function DayPickerComponent({
    title,
    minDate,
    maxDate,
    mode = 'multiple', // 'multiple' or 'range'
}: any) {
    const [formData, setFormData] = useState<formData>({ selectedDays: [] });

    const getDatesBetween = (startDate: Date, endDate: Date) => {
        const dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const handleDateSelect = (selection: any, triggerDate: any, modifiers: any) => {
        console.log({ selection, triggerDate, modifiers })
        if (mode === 'multiple') {
            setFormData({ selectedDays: (selection || [])});
        } else if (selection?.from && selection?.to) {
            setFormData({ selectedDays: getDatesBetween(selection.from, selection.to)});
        } else {
            
        }
    };

    const getRangeFromSelectedDays = () => {
        if (formData.selectedDays.length === 0) return { from: undefined, to: undefined };
        return {
            from: formData.selectedDays[0],
            to: formData.selectedDays[formData.selectedDays.length - 1]
        };
    };

    return (
        <div className="flex flex-col gap-[10px] font-medium items-center justify-center">
            <h1 className="text-2xl font-semibold mb-6">{title}</h1>
            <div className="mt-2 flex">
                <DayPicker
                    mode={mode}
                    min={0}
                    onSelect={handleDateSelect}
                    selected={mode === 'multiple' ? formData.selectedDays : getRangeFromSelectedDays()}
                    defaultMonth={minDate}
                    startMonth={minDate}
                    endMonth={maxDate}
                    pagedNavigation
                    showOutsideDays
                    classNames={classNames}
                    className="border border-zinc-300 p-[20px] rounded-[6px]"
                />
            </div>
        </div>
    )
}