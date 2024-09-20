

import { Textarea } from "rizzui";

export default function Description({ title, change, value }: { title: string, change: (value: string) => void, value: string }) {
    return (
        <Textarea
            label={title}
            placeholder="Enter a description of what happened on the entered dates"
            className="font-light"
            onChange={(e) => change(e.target.value)}
            value={value}
        />
    )
}