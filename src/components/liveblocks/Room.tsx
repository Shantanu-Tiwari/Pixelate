"use client";

import { LiveList, LiveMap, LiveObject, LsonObject } from "@liveblocks/client";
import {
    ClientSideSuspense,
    LiveblocksProvider,
    RoomProvider,
} from "@liveblocks/react";
import { ReactNode } from "react";
import { Layer } from "~/types";

export function Room({
                         children,
                         roomId,
                     }: {
    children: ReactNode;
    roomId: string;
}) {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <RoomProvider
                id={roomId}
                initialPresence={{
                    selection: [],
                    cursor: null,
                    penColor: null,
                    pencilDraft: null,
                }}
                initialStorage={() => ({
                    roomColor: { r: 30, g: 30, b: 30 },
                    layers: new LiveMap<string, LiveObject<Layer & LsonObject>>(),
                    layerIds: new LiveList<string>([]),
                })}
            >
                <ClientSideSuspense
                    fallback={
                        <div className="flex h-screen flex-col items-center justify-center gap-2">
                            <img
                                src="/img.png"
                                alt="Pixelate logo"
                                className="h-[50px] w-[50px] animate-bounce"
                            />
                            <h1 className="text-sm font-normal">Loading</h1>
                        </div>
                    }
                >
                    {() => children as ReactNode}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}