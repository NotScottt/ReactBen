export function SkinPicker(rebirtLevel) {
    // Stages
    // 250k, 500k, 1M, 2M, 4M, 8M, 16M, 32M, 64M, 128M, 256M
    
    const skinsSrc = [
        'assets/BenSkins/BenFigure.png',  
        'assets/BenSkins/EmoBen.png',
        'assets/BenSkins/LeanBen.png',
        'assets/BenSkins/PencilBen.png',
        'assets/BenSkins/StonedBen.png',
        'assets/BenSkins/MusicBen.png',
        'assets/BenSkins/LegoBen.png',
        'assets/BenSkins/GoldenBen.png',
        'assets/BenSkins/DiamondBen.png',
        'assets/BenSkins/UltimateBen.png',
        'assets/BenSkins/TheOneAndOnlyBen.png',
    ]

    for (let index = 0; index < skinsSrc.length; index++) {
        return (skinsSrc[rebirtLevel] || skinsSrc[0]);
    }
}