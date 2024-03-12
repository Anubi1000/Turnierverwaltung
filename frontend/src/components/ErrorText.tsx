import React from "react";
import {Text} from "@/components/Text";

export function ErrorText({
    fillScreen
}: {
    fillScreen?: boolean
}) {
    if (typeof fillScreen == "undefined") {
        fillScreen = true
    }

    let classes = "flex flex-col items-center justify-center"
    if (fillScreen) {
        classes += " h-screen"
    }

    return (
        <div className={classes}>
            <Text className="text-red-500" level="h2">Etwas ist schiefgelaufen</Text>
        </div>
    )
}