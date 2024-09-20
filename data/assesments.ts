import { Assessment } from "@/components/Self_Assessment/page";

const Data: Assessment[] = [
    {
        reasons: [
            {
                title: 'Between January 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual due to one or more of the following reasons:',
                list: [
                    {
                        title: 'You were ordered or advised to quarantine or self-isolate due to COVID-19.'
                    },
                    {
                        title: 'You were experiencing symptoms of COVID-19 and seeking a medical diagnosis.'
                    }
                ]
            },
            {
                title: 'The following reasons for sick leave are also valid for dates between April 1, 2021 and September 30, 2021:',
                list: [
                    {
                        title: 'You were waiting on a COVID-19 test or diagnosis.'
                    },
                    {
                        title: 'You were obtaining a COVID-19 immunization.'
                    },
                    {
                        title: 'You were recovering from a COVID-19 immunization injury, disability, illness, or related condition.'
                    }
                ]
            }
        ],
        action: () => {},
        children: false,
        startData: new Date(2021, 0, 1),
        endDate: new Date(2021, 2, 31),
        index: 1,
        final: false
    },
    {
        reasons: [
            {
                title: 'Between January 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual because:',
                list: [
                    {
                        title: 'You were caring for anyone who was quarantining.'
                    }
                ]
            },
            {
                title: 'The following reasons for family leave are also valid for dates between April 1, 2021 and September 30, 2021:',
                list: [
                    {
                        title: 'You were taking someone to receive a COVID-19 immunization.'
                    },
                    {
                        title: 'You were caring for anyone recovering from a COVID-19 immunization injury, disability, illness, or related condition.'
                    }
                ]
            }
        ],
        action: () => {},
        children: true,
        startData: new Date(2021, 0, 1),
        endDate: new Date(2021, 2, 31),
        index: 2,
        final: false
    },
    {
        reasons: [
            {
                title: 'Between January 1, 2021 and September 30, 2021, please enter the dates you were unable to perform services as a self-employed individual because:',
                list: [
                    {
                        title: 'You were caring for a son or daughter whose school or place of childcare was closed due to COVID-19.'
                    }
                ]
            },
            {
                title: 'The following reasons for family leave are also valid for dates between April 1, 2021 and September 30, 2021:',
                list: [
                    {
                        title: 'You were taking a son or daughter to receive a COVID-19 immunization.'
                    },
                    {
                        title: 'You were caring for a son or daughter who was quarantining or recovering from a COVID-19 immunization injury, disability, illness, or related condition.'
                    }
                ]
            }
        ],
        action: () => {},
        children: true,
        startData: new Date(2021, 0, 1),
        endDate: new Date(2021, 2, 31),
        index: 3,
        final: true
    },
]

export { Data };