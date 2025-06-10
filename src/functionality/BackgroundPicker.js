import { ReturnBackgrounds } from "./ReturnBackgrounds";

export function BackgroundPicker(rebirthLevel) {
    const roomSrc = ReturnBackgrounds();

    for (let index = 0; index < roomSrc.length; index++) {
        return (roomSrc[rebirthLevel]?.src || roomSrc[0].src);
    }

    return roomSrc[rebirthLevel].src
}