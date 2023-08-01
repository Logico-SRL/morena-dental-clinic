import { useLayoutEffect } from "react";

export const TacViewer = ({ src }: { src: string }) => {
    useLayoutEffect(() => {
        fetch(`${src}/opentacviewer`)
    }, [src])

    return null;
}