import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function Nav() {
    return (
        <div className="w-full h-[100px] border-b border-zinc-200 z-50 flex items-center justify-between px-[20px]">
            <img src="/images/assets/fifo_logo_png.png" className="w-[80px]" alt="logo" />
            <div className="flex items-center justify-between gap-[10px]">
                <h1 className='underline' style={{ color: '#4682B4' }}>New to fifo? Create an account</h1>
                <div className='px-[12px] py-[14px] bg-white flex rounded-[5px] gap-[4px] border border-zinc-300'>
                    <h1 style={{ color: '#797B81' }}>Language:</h1>
                    <h1>English</h1>
                    <KeyboardArrowDownIcon sx={{ fontSize: 25 }} />
                </div>
            </div>
        </div>
    )
}