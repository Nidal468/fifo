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
    stepKey,
    nextPath,
    minDate,
    maxDate,
    maxClaimableDays,
    mode = 'multiple', // 'multiple' or 'range'
    children
}: any) {
    const [formData, setFormData] = useState<formData>({ selectedDays: [] });
    const defaultClassNames = getDefaultClassNames();

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
            setFormData({ selectedDays: (selection || []).slice(0, maxClaimableDays) });
        } else if (selection?.from && selection?.to) {
            setFormData({ selectedDays: getDatesBetween(selection.from, selection.to).slice(0, maxClaimableDays) });
        } else {
            // setFormData({ selectedDays: [] });
        }
    };

    const getRangeFromSelectedDays = () => {
        if (formData.selectedDays.length === 0) return { from: undefined, to: undefined };
        return {
            from: formData.selectedDays[0],
            to: formData.selectedDays[formData.selectedDays.length - 1]
        };
    };

    const getSelectedDaysCount = () => formData.selectedDays.length;
    const progressPercentage = (getSelectedDaysCount() / maxClaimableDays) * 100;

    return (
        <div className="flex flex-col gap-[10px] font-medium items-center justify-center">
            <h1 className="text-2xl font-semibold mb-6">{title}</h1>
            <div className="bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 w-[60%]">
                <div
                    className={`h-2.5 rounded-full w-full ${progressPercentage === 100 ? 'bg-green-700' : 'bg-orange-500'
                        }`}
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <p className="text-sm text-center mb-4">
                You have selected {getSelectedDaysCount()} of {maxClaimableDays} maximum days.
            </p>
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