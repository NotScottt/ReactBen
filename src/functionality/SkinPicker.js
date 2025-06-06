import { ReturnSkins } from "./ReturnSkins";

export function SkinPicker(rebirtLevel) {
    // Stages
    // 250k, 500k, 1M, 2M, 4M, 8M, 16M, 32M, 64M, 128M, 256M
    
    const skinsSrc = ReturnSkins();

    for (let index = 0; index < skinsSrc.length; index++) {
        return (skinsSrc[rebirtLevel] || skinsSrc[0]);
    }
}