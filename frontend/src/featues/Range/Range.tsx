import { useEffect, useRef, useState } from "react";

interface Props {
    max: number;
    current: number;
    disabled?: boolean;
    progress?: number;
    onChange: (value: number) => void;
    width: number;
}

export const Range: React.FC<Props> = ({
    current,
    disabled,
    max,
    width,
    onChange,
    progress,
}) => {
    const [tempValue, setTempValue] = useState<number>(0);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const rangeRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (event: React.MouseEvent) => {
        event.preventDefault();

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (rangeRef.current) {
            setShowTooltip(true);
            const rangeRect = rangeRef.current.getBoundingClientRect();
            const newLeft = Math.min(
                Math.max(event.clientX - rangeRect.left, 0),
                rangeRect.width
            );
            const newValue = (newLeft / rangeRect.width) * max;
            setTempValue((Math.floor(newValue) / max) * 100);
        }
    };

    const handleMouseUp = () => {
        setShowTooltip(false);
        onChange(Math.floor(tempValue));
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleTrackClick = (event: React.MouseEvent) => {
        if (rangeRef.current) {
            const rangeRect = rangeRef.current.getBoundingClientRect();
            const newLeft = Math.min(
                Math.max(event.clientX - rangeRect.left, 0),
                rangeRect.width
            );
            const newValue = (newLeft / rangeRect.width) * max;
            onChange(Math.floor(newValue));
        }
    };
    useEffect(() => {
        if (thumbRef.current) {
            thumbRef.current.style.left = `${
                showTooltip ? tempValue : current
            }%`;
        }
    }, [showTooltip, tempValue, current]);
    return (
        <div
            style={{ width: `${width}px` }}
            ref={rangeRef}
            onClick={handleTrackClick}
            className={`rounded-lg bg-gray-700 h-2.5 cursor-pointer overflow-hidden relative z-10 ${
                disabled ? "disabled:pointer-events-none" : ""
            }`}
        >
            <div
                ref={thumbRef}
                style={{ transition: "all .3s" }}
                onMouseDown={handleMouseDown}
                className="h-2.5 w-2.5 top-[50%] translate-y-[-50%]  rounded-full bg-gradient absolute z-10"
            ></div>
            <div
                className="bg-gradient absolute top-0 left-0 h-full rounded-full z-0"
                style={{
                    transition: showTooltip ? "none" : "all .3s",
                    width: `${showTooltip ? tempValue : current}%`,
                }}
            ></div>
            <div
                className=" bg-gray-500  h-full rounded-full -z-10 absolute"
                style={{ width: `${progress}%`, transition: "all .3s" }}
            ></div>
        </div>
    );
};
