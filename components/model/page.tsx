export function Model({elements, color}: {elements: JSX.Element, color: string}) {
    return(
        <div className="py-[10px] px-[20px] md:py-[40px] md:px-[60px] flex flex-col rounded-[8px]" style={{background: color}}>
            {elements}
        </div>
    )
}