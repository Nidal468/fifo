type Config = {
    title: string;
    titleFull: string;
    apiUrl: string;
    idMeClientId: string;
    clientOnboardingSteps: string[];
};

export const config:Config = {
    title: 'fifo.com',
    titleFull: 'Onboarding - fifo.com',

    apiUrl: 'https://test.coloredmanga.net',
    idMeClientId: 'eca0f4389a9faa95c359fd869a29c1b2',

    clientOnboardingSteps: [
        'eligibilityquiz',
        'idme',
        'initialsignup',
        'personaldetails',
        'businessverification',
        'identityverification',
        'authorizedrepresentative',
        'creditandtaxhandling',
        'specialpurposebankaccount',
        'eroandbusinessmatching',
        'reviewandcompliance',
        'confirmation'
    ]
}