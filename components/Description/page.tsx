import { Textarea } from "rizzui";

export default function Description({ title }: { title: string }) {
    return (
        <Textarea
            label={title}
            placeholder="Enter a description of what happened on the entered dates"
            className="font-light"
        />
    )
}