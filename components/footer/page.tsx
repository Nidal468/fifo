import Link from "next/link";

export default function Footer() {
    return (
        <div className="w-full py-[20px] bg-zinc-800 flex flex-col items-center justify-center text-white text-[12px] gap-[10px] border-t border-zinc-400">
            <div className="flex">
                <h1 className="px-[5px] border-r-2 border-zinc-400">CONTACT US</h1>
                <Link href='/cookies-policy' className="px-[5px]">COOKIE POLICY</Link>
            </div>
            <h1 className="text-[14px] font-medium">Follow us on</h1>
            <div className="flex gap-[10px] text-zinc-400">
                <h1>Twitter</h1>
                <h1>Discord</h1>
                <h1>Facebook</h1>
            </div>
            <h1 className="text-[9px] text-zinc-500">© 2024 Fifo.com All rights reserved</h1>
        </div>
    )
}