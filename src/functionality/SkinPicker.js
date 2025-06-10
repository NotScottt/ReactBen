import { ReturnSkins } from "./ReturnSkins";

export function SkinPicker(rebirthLevel) {

    const skinsSrc = ReturnSkins();

    for (let index = 0; index < skinsSrc.length; index++) {
        return (skinsSrc[rebirthLevel]?.src || skinsSrc[0].src);
    }
}