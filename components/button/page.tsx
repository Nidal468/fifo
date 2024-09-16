export function Button({
    text, width, clicked, src, color = '', border = '' , textColor = ''}:
    { text: string, width: string, clicked: () => void, src?: string, color?: string, border?: string , textColor?: string}) {
    return (
        <div

            className="flex items-center justify-center py-[10px] px-[12px] text-white rounded-full text-[14px] gap-[10px]"
            style={{ width: width, backgroundColor: color !== '' ? color : '#FF7352', border: border !== '' ? border : '' , color: textColor !== ''? textColor:'#fff'}}
            onClick={() => clicked()}

        >
            <h1>{text}</h1>
            {src && <img src={src} alt={src} className="w-[20%]" />}
        </div>
    )
}