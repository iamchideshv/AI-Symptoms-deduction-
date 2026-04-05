"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Spotlight = ({
    gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
    gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
    gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
    translateY = -350,
    width = 560,
    height = 1380,
    duration = 7,
    xOffset = 100,
    className,
}) => {
    return (
        <div className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}>
            <div
                style={{
                    transform: `translateY(${translateY}px) rotate(-45deg)`,
                    width: `${width}px`,
                    height: `${height}px`,
                    left: `calc(50% - ${xOffset}px)`,
                    position: "absolute",
                }}
                className="animate-spotlight-new"
            >
                <div
                    style={{
                        background: gradientFirst,
                        width: "100%",
                        height: "100%",
                    }}
                />
                <div
                    style={{
                        background: gradientSecond,
                        width: "100%",
                        height: "100%",
                        marginTop: "-100%",
                    }}
                />
                <div
                    style={{
                        background: gradientThird,
                        width: "100%",
                        height: "100%",
                        marginTop: "-100%",
                    }}
                />
            </div>
        </div>
    );
};
