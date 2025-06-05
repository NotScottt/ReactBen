export function SkinPicker(rebirtLevel) {
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
    ]

    for (let index = 0; index < skinsSrc.length; index++) {
        return (skinsSrc[rebirtLevel] || skinsSrc[0]);
    }
}