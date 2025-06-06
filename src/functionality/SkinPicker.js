import { ReturnSkins } from "./ReturnSkins";

export function SkinPicker(rebirtLevel) {

    const skinsSrc = ReturnSkins();

    for (let index = 0; index < skinsSrc.length; index++) {
        return (skinsSrc[rebirtLevel]?.src || skinsSrc[0].src);
    }
}