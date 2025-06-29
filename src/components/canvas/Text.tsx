import { useMutation } from "@liveblocks/react";
import { useEffect, useRef, useState } from "react";
import { EllipseLayer, RectangleLayer, TextLayer } from "~/types";
import { colorToCss } from "~/utils";
import { LiveObject } from "@liveblocks/client";

export default function Text({
                                 id,
                                 layer,
                                 onPointerDown,
                             }: {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, layerId: string) => void;
}) {
    const {
        x,
        y,
        width,
        height,
        text,
        fontSize,
        fill,
        stroke,
        opacity,
        fontFamily,
        fontWeight,
    } = layer;

    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(text);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const updateText = useMutation(
        ({ storage }, newText: string) => {
            const liveLayers = storage.get("layers") as any;
            const layer = liveLayers.get(id) as LiveObject<TextLayer>;
            if (layer) {
                layer.update({ text: newText });
            }
        },
        [id],
    );

    useEffect(() => {
        if (isEditing) {
            const input = inputRef.current;
            if (input) {
                input.focus();
            }
        }
    }, [isEditing]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        updateText(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            updateText(inputValue);
        }
    };

    return (
        <g className="group" onDoubleClick={handleDoubleClick}>
            {isEditing ? (
                <foreignObject x={x} y={y} width={width} height={height}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        style={{
                            fontSize: `${fontSize}px`,
                            color: colorToCss(fill),
                            width: "100%",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontFamily: fontFamily,
                            fontWeight: fontWeight,
                        }}
                    />
                </foreignObject>
            ) : (
                <>
                    <rect
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        width={width}
                        height={height}
                        fill="none"
                        stroke="#0b99ff"
                        strokeWidth="2"
                        className="pointer-events-none opacity-0 group-hover:opacity-100"
                    />
                    <text
                        onPointerDown={(e) => onPointerDown(e, id)}
                        x={x}
                        y={y + fontSize}
                        fontSize={fontSize}
                        fill={colorToCss(fill)}
                        stroke={colorToCss(stroke)}
                        opacity={opacity / 100} // Convert to decimal if opacity is 0-100
                        fontFamily={fontFamily}
                        fontWeight={fontWeight}
                        className="cursor-pointer"
                    >
                        {text}
                    </text>
                </>
            )}
        </g>
    );
}