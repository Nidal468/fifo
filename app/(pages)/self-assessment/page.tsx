'use client'

import { useEffect, useState } from "react";
// @ts-ignore
import ApiClient from '@/lib/apiClient';
// @ts-ignore
var api = new ApiClient('https://staging.fifo.com');

type SelfAssessment =
    {
        startDate: string,
        endDate: string,
        days: number,
        description: string,
    }

export default function SelfAssessment() {

    const formData: SelfAssessment[] = [
        {
            startDate: '',
            endDate: '',
            days: 0,
            description: ''
        },
        {
            startDate: '',
            endDate: '',
            days: 0,
            description: ''
        },
        {
            startDate: '',
            endDate: '',
            days: 0,
            description: ''
        },
        {
            startDate: '',
            endDate: '',
            days: 0,
            description: ''
        },
        {
            startDate: '',
            endDate: '',
            days: 0,
            description: ''
        },
        {
            startDate: '',
            endDate: '',
            days: 0,
            description: ''
        },
        {
            startDate: '',
            endDate: '',
            days: 0,
            description: ''
        }
    ]

    const [data, setData] = useState<SelfAssessment[]>(formData);
    const [next, setNext] = useState(0);
    const [dateRanges, setDateRanges] = useState<any[]>([]);
    const [currentRange, setCurrentRange] = useState<{ startDate: string, endDate: string }>({ startDate: '', endDate: '' });
    const [description, setDescription] = useState<any>('');
    const [error, setError] = useState<any>('');
    const [files, setFiles] = useState<FileList | null>(null);
    

    const handleStartDateChange = (e: { target: { value: any; }; }, next: number) => {
        const newStartDate = e.target.value;
        setCurrentRange({ ...currentRange, startDate: e.target.value });
        setData(prev =>
            prev.map((item, index) =>
                index === next ? { ...item, startDate: newStartDate } : item
            )
        );
    };

    const handleEndDateChange = (e: { target: { value: any; }; }, next: number) => {
        const newEndDate = e.target.value;

        // Update the currentRange state
        setCurrentRange({ ...currentRange, endDate: newEndDate });

        // Update the specific item in the data array
        setData(prev =>
            prev.map((item, index) =>
                index === next ? { ...item, endDate: newEndDate } : item
            )
        );
    };


    const handleAddRange = (length: number, next: number) => {
        const { startDate, endDate } = currentRange;

        const start: any = new Date(startDate);
        const end: any = new Date(endDate);

        const days = (end - start) / (1000 * 60 * 60 * 24);

        setData(prev =>
            prev.map((item, index) =>
                index === next ? { ...item, days: days } : item
            )
        );
        if (days > 11) {
            setError(`Cannot select more than ${length} days.`);
            return;
        }
        setDateRanges([...dateRanges, { startDate, endDate }]);
        setError('');
    };

    const handleDescriptionChange = (e: { target: { value: any; }; }) => {
        setDescription(e.target.value);
        setData(prev =>
            prev.map((item, index) =>
                index === next ? { ...item, description: description } : item
            )
        );
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (data[next].days > 8 && description.trim() === '') {
            setError('Please provide a description for more than 8 days.');
            return;
        }
        if (currentRange.startDate !== '' && currentRange.endDate !== '' && dateRanges.length === 0) {
            setError('Please add the range of days first')
        } else {
            console.log(data)
            setCurrentRange({ startDate: '', endDate: '' });
            setDateRanges([])
            setNext(prev => prev + 1);
        }
    };

    const uploadData = async () => {
        const totalDays = data.reduce((total, item) => total + item.days, 0);
        if (files !== null && totalDays !== 0) {
            await api.addSessionData('self_assessment', data);
            await api.addSessionData('self_assessment_files', files);
            window.location.href = '/taxstatus'
        } else {
            setError('Make sure to uploaded document list for evidence and select more then 1 days at least')
        }
    }

    useEffect(() => {
        const getSession = async () => {
            var session = await api.getSession()
            console.log(session);
        }
        getSession()
    }, [])

    const Skip = () => {
        if (dateRanges.length === 0 && currentRange.startDate === '' && currentRange.endDate === '') {
            setNext(prev => prev + 1)
        } else setError('Please Submit the selected days first')
    }

    return (
        <div className="w-full min-h-[100vh] bg-zinc-100 flex flex-col items-center justify-center gap-[30px] py-[40px]">
            <div className="w-[90%] md:w-[500px] py-[10px] md:py-[20px] flex flex-col border rounded-[4px] bg-white shadow-lg">
                {next === 0 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Sick date self-assessment</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">Between January 1, 2021 and March 31, 2021, please enter the dates you were unable to perform services as a self-employed individual due to one or more of the following reasons:</h1>
                        <div className="flex flex-col gap-[10px] text-zinc-600">
                            <h1>• You were subject to a federal, state, or local quarantine or isolation order related to COVID-19.</h1>
                            <h1>• You were advised by a health care provider to self-quarantine due to concerns related to COVID-19.</h1>
                            <h1>• You were experiencing symptoms of COVID-19 and seeking a medical diagnosis.</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full border p-[10px] rounded-[4px] flex flex-col gap-[10px] items-start">
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="startDate" className="font-bold">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    min="2021-01-01"
                                    max="2021-03-31"
                                    value={currentRange.startDate}
                                    onChange={(e) => handleStartDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="endDate" className="font-bold">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    min={currentRange.startDate || '2021-01-01'}
                                    max="2021-03-31"
                                    value={currentRange.endDate}
                                    onChange={(e) => handleEndDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            {dateRanges.reduce((acc, range) => {
                                const start: any = new Date(range.startDate);
                                const end: any = new Date(range.endDate);
                                return acc + ((end - start) / (1000 * 60 * 60 * 24) + 1);
                            }, 0) > 8 && (
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <label htmlFor="description" className="font-bold">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                            className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                        />
                                    </div>
                                )}
                            {dateRanges.map((range, index) => (
                                <p key={index} className="w-full bg-slate-100 p-[10px] rounded-[4px]">{new Date(range.startDate).toLocaleDateString()} to {new Date(range.endDate).toLocaleDateString()}</p>
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="w-full flex gap-[10px]">
                                <button type="button" onClick={() => handleAddRange(10, next)} disabled={!currentRange.startDate || !currentRange.endDate} className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Add Range</button>
                                <button type="submit" className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Submit</button>
                            </div>
                        </form>
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-bold">If none of these apply to you, skip this section.</h1>
                            <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => Skip()}>Skip</button>
                        </div>
                    </div>
                </div>}
                {next === 1 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Sick date self-assessment</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">Between January 1, 2021 and March 31, 2021, please enter the dates you were unable to perform services as a self-employed individual due to one or more of the following reasons:</h1>
                        <div className="flex flex-col gap-[10px] text-zinc-600">
                            <h1>• You were caring for an individual who was subject to a federal, state, or local quarantine or isolation order related to COVID-19.</h1>
                            <h1>• You were caring for an individual who was advised by a health care provider to self-quarantine due to concerns related to COVID-19.</h1>
                            <h1>• You were caring for a son or daughter because the school or place of care for that child was closed or the childcare provider for that child was unavailable due to COVID-19 precautions.</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full border p-[10px] rounded-[4px] flex flex-col gap-[10px] items-start">
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="startDate" className="font-bold">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    min="2021-01-01"
                                    max="2021-03-31"
                                    value={currentRange.startDate}
                                    onChange={(e) => handleStartDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="endDate" className="font-bold">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    min={currentRange.startDate || '2021-01-01'}
                                    max="2021-03-31"
                                    value={currentRange.endDate}
                                    onChange={(e) => handleEndDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            {dateRanges.reduce((acc, range) => {
                                const start: any = new Date(range.startDate);
                                const end: any = new Date(range.endDate);
                                return acc + ((end - start) / (1000 * 60 * 60 * 24) + 1);
                            }, 0) > 8 && (
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <label htmlFor="description" className="font-bold">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                            className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                        />
                                    </div>
                                )}
                            {dateRanges.map((range, index) => (
                                <p key={index} className="w-full bg-slate-100 p-[10px] rounded-[4px]">{new Date(range.startDate).toLocaleDateString()} to {new Date(range.endDate).toLocaleDateString()}</p>
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="w-full flex gap-[10px]">
                                <button type="button" onClick={() => handleAddRange(10, next)} disabled={!currentRange.startDate || !currentRange.endDate} className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Add Range</button>
                                <button type="submit" className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Submit</button>
                            </div>
                        </form>
                        <p className="text-[12px]">Son or daughter: A son or daughter must generally be under 18 years of age or incapable of self-care because of a mental or physical disability. For more information about who is a son or daughter under the FFCRA, see DOL.gov/agencies/whd/pandemic/ffcra-questions#40.</p>
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-bold">If none of these apply to you, skip this section.</h1>
                            <div className="flex gap-[10px]">
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => Skip()}>Skip</button>
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev - 1)}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {next === 2 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Sick date self-assessment</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">Between January 1, 2021 and March 31, 2021, please enter the dates you were unable to perform services as a self-employed individual due to coronavirus-related care you provided to a son or daughter whose school or place of care was closed or whose child care provider was unavailable for reasons related to COVID-19.</h1>
                        <form onSubmit={handleSubmit} className="w-full border p-[10px] rounded-[4px] flex flex-col gap-[10px] items-start">
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="startDate" className="font-bold">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    min="2021-01-01"
                                    max="2021-03-31"
                                    value={currentRange.startDate}
                                    onChange={(e) => handleStartDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="endDate" className="font-bold">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    min={currentRange.startDate || '2021-01-01'}
                                    max="2021-03-31"
                                    value={currentRange.endDate}
                                    onChange={(e) => handleEndDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            {dateRanges.reduce((acc, range) => {
                                const start: any = new Date(range.startDate);
                                const end: any = new Date(range.endDate);
                                return acc + ((end - start) / (1000 * 60 * 60 * 24) + 1);
                            }, 0) > 8 && (
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <label htmlFor="description" className="font-bold">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                            className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                        />
                                    </div>
                                )}
                            {dateRanges.map((range, index) => (
                                <p key={index} className="w-full bg-slate-100 p-[10px] rounded-[4px]">{new Date(range.startDate).toLocaleDateString()} to {new Date(range.endDate).toLocaleDateString()}</p>
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="w-full flex gap-[10px]">
                                <button type="button" onClick={() => handleAddRange(50, next)} disabled={!currentRange.startDate || !currentRange.endDate} className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Add Range</button>
                                <button type="submit" className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Submit</button>
                            </div>
                        </form>
                        <p className="text-[12px]">A son or daughter must generally be under 18 years of age or incapable of self-care because of a mental or physical disability. For more information about who is a son or daughter under the FFCRA, see DOL.gov/agencies/whd/pandemic/ffcra-questions#40.</p>
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-bold">If none of these apply to you, skip this section.</h1>
                            <div className="flex gap-[10px]">
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => Skip()}>Skip</button>
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev - 1)}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {next === 3 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Sick date self-assessment</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">Between April 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual due to one or more of the following reasons:</h1>
                        <div className="flex flex-col gap-[10px] text-zinc-600">
                            <h1>• You were subject to a federal, state, or local quarantine or isolation order related to COVID-19.</h1>
                            <h1>• You were advised by a health care provider to self-quarantine due to concerns related to COVID-19.</h1>
                            <h1>• You were experiencing symptoms of COVID-19 and seeking a medical diagnosis.</h1>
                            <h1>• You are seeking or awaiting the results of a diagnostic test for, or a medical diagnosis of COVID-19.</h1>
                            <h1>• You were exposed to COVID-19 or were unable to work pending the results of a test or diagnosis.</h1>
                            <h1>• You are obtaining immunization related to COVID-19.</h1>
                            <h1>• You are recovering from any injury, disability, illness, or condition related to such immunization.</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full border p-[10px] rounded-[4px] flex flex-col gap-[10px] items-start">
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="startDate" className="font-bold">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    min="2021-01-01"
                                    max="2021-03-31"
                                    value={currentRange.startDate}
                                    onChange={(e) => handleStartDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="endDate" className="font-bold">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    min={currentRange.startDate || '2021-01-01'}
                                    max="2021-03-31"
                                    value={currentRange.endDate}
                                    onChange={(e) => handleEndDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            {dateRanges.reduce((acc, range) => {
                                const start: any = new Date(range.startDate);
                                const end: any = new Date(range.endDate);
                                return acc + ((end - start) / (1000 * 60 * 60 * 24) + 1);
                            }, 0) > 8 && (
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <label htmlFor="description" className="font-bold">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                            className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                        />
                                    </div>
                                )}
                            {dateRanges.map((range, index) => (
                                <p key={index} className="w-full bg-slate-100 p-[10px] rounded-[4px]">{new Date(range.startDate).toLocaleDateString()} to {new Date(range.endDate).toLocaleDateString()}</p>
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="w-full flex gap-[10px]">
                                <button type="button" onClick={() => handleAddRange(10, next)} disabled={!currentRange.startDate || !currentRange.endDate} className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Add Range</button>
                                <button type="submit" className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Submit</button>
                            </div>
                        </form>
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-bold">If none of these apply to you, skip this section.</h1>
                            <div className="flex gap-[10px]">
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => Skip()}>Skip</button>
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev - 1)}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {next === 4 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Sick date self-assessment</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">Between April 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual due to one or more of the following reasons:</h1>
                        <div className="flex flex-col gap-[10px] text-zinc-600">
                            <h1>• You were caring for an individual who was subject to a federal, state, or local quarantine or isolation order related to COVID-19.</h1>
                            <h1>• You were caring for an individual who was advised by a health care provider to self-quarantine due to concerns related to COVID-19.</h1>
                            <h1>• You were caring for a son or daughter because the school or place of care for that child was closed or the childcare provider for that child was unavailable due to COVID-19 precautions.</h1>
                            <h1>• You were accompanying an individual to obtain immunization.</h1>
                            <h1>• You are caring for an individual who is recovering from any injury, disability, illness, or condition related to immunization</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full border p-[10px] rounded-[4px] flex flex-col gap-[10px] items-start">
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="startDate" className="font-bold">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    min="2021-01-01"
                                    max="2021-03-31"
                                    value={currentRange.startDate}
                                    onChange={(e) => handleStartDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="endDate" className="font-bold">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    min={currentRange.startDate || '2021-01-01'}
                                    max="2021-03-31"
                                    value={currentRange.endDate}
                                    onChange={(e) => handleEndDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            {dateRanges.reduce((acc, range) => {
                                const start: any = new Date(range.startDate);
                                const end: any = new Date(range.endDate);
                                return acc + ((end - start) / (1000 * 60 * 60 * 24) + 1);
                            }, 0) > 8 && (
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <label htmlFor="description" className="font-bold">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                            className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                        />
                                    </div>
                                )}
                            {dateRanges.map((range, index) => (
                                <p key={index} className="w-full bg-slate-100 p-[10px] rounded-[4px]">{new Date(range.startDate).toLocaleDateString()} to {new Date(range.endDate).toLocaleDateString()}</p>
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="w-full flex gap-[10px]">
                                <button type="button" onClick={() => handleAddRange(10, next)} disabled={!currentRange.startDate || !currentRange.endDate} className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Add Range</button>
                                <button type="submit" className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Submit</button>
                            </div>
                        </form>
                        <p className="text-[12px]">Son or daughter: A son or daughter must generally be under 18 years of age or incapable of self-care because of a mental or physical disability. For more information about who is a son or daughter under the FFCRA, see DOL.gov/agencies/whd/pandemic/ffcra-questions#40.
                        </p>
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-bold">If none of these apply to you, skip this section.</h1>
                            <div className="flex gap-[10px]">
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => Skip()}>Skip</button>
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev - 1)}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {next === 5 && <div className="flex flex-col w-full">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Sick date self-assessment</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">Between April 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual due to coronavirus-related care you provided to a son or daughter whose school or place of care is closed or whose childcare provider is unavailable for reasons related to COVID-19 or for any reason you may claim sick leave equivalent credits.</h1>
                        <form onSubmit={handleSubmit} className="w-full border p-[10px] rounded-[4px] flex flex-col gap-[10px] items-start">
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="startDate" className="font-bold">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    min="2021-01-01"
                                    max="2021-03-31"
                                    value={currentRange.startDate}
                                    onChange={(e) => handleStartDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-[5px]">
                                <label htmlFor="endDate" className="font-bold">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    min={currentRange.startDate || '2021-01-01'}
                                    max="2021-03-31"
                                    value={currentRange.endDate}
                                    onChange={(e) => handleEndDateChange(e, next)}
                                    className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                />
                            </div>
                            {dateRanges.reduce((acc, range) => {
                                const start: any = new Date(range.startDate);
                                const end: any = new Date(range.endDate);
                                return acc + ((end - start) / (1000 * 60 * 60 * 24) + 1);
                            }, 0) > 8 && (
                                    <div className="w-full flex flex-col gap-[5px]">
                                        <label htmlFor="description" className="font-bold">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                            required
                                            className="w-full bg-slate-100 outline-0 p-[10px] rounded-[4px]"
                                        />
                                    </div>
                                )}
                            {dateRanges.map((range, index) => (
                                <p key={index} className="w-full bg-slate-100 p-[10px] rounded-[4px]">{new Date(range.startDate).toLocaleDateString()} to {new Date(range.endDate).toLocaleDateString()}</p>
                            ))}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div className="w-full flex gap-[10px]">
                                <button type="button" onClick={() => handleAddRange(60, next)} disabled={!currentRange.startDate || !currentRange.endDate} className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Add Range</button>
                                <button type="submit" className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold">Submit</button>
                            </div>
                        </form>
                        <p className="text-[12px]">Son or daughter: A son or daughter must generally be under 18 years of age or incapable of self-care because of a mental or physical disability. For more information about who is a son or daughter under the FFCRA, see DOL.gov/agencies/whd/pandemic/ffcra-questions#40.</p>
                        <div className="flex flex-col gap-[10px]">
                            <h1 className="font-bold">If none of these apply to you, skip this section.</h1>
                            <div className="flex gap-[10px]">
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => Skip()}>Skip</button>
                                <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev - 1)}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>}
                {next === 6 && <div className="flex flex-col w-full gap-[10px]">
                    <div className="w-full p-[20px] flex flex-col border-b text-zinc-800 gap-[10px]">
                        <h1 className="text-[12px] md:text-[14px] md:text-[16px] font-bold">Sick date self-assessment</h1>
                        <p className="text-[10px] md:text-[14px]">To determine your eligibility for the Sick and Family Leave Credit, please answer the following questions:</p>
                    </div>
                    <div className="w-full bg-zinc-200 p-[10px] flex flex-col items-start gap-[10px] text-zinc-800">
                        <h1>Uploaded document list for evidence</h1>
                        <input type="file" onChange={(e) => { setFiles(e.target.files) }} />
                    </div>
                    <div className="w-full p-[10px] md:p-[20px] text-zinc-800 text-[12px] md:text-[14px] flex flex-col gap-[5px] md:gap-[15px]">
                        <h1 className="font-bold">All information in this self-assessment must be true and accurate to the best of your knowledge. Any submission of data to the IRS that is known to be false or fraudulent could subject you, the taxpayer, to fines or imprisonment.</h1>
                        <div className="flex gap-[10px]">
                            <button type="submit" className="w-[120px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => uploadData()}>Submit</button>
                            <button className="w-[100px] py-[8px] bg-sky-500 rounded-[4px] text-zinc-200 font-bold" onClick={() => setNext(prev => prev - 1)}>Back</button>
                        </div>
                        <p style={{ color: error !== '' ? "red" : "" }}>{error}</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}