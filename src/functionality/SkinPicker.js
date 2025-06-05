export function SkinPicker(rebirtLevel) {
    const skinsSrc = [
        'assets/BenSkins/BenFigure.png',
        'assets/BenSkins/EmoBen.png',
        'assets/BenSkins/LeanBen.png',
        'assets/BenSkins/PencilBen.png',
        'assets/BenSkins/StonedBen.png',
        'assets/BenSkins/MusicBen.png',
    ]

    for (let index = 0; index < skinsSrc.length; index++) {
        return (skinsSrc[rebirtLevel] || skinsSrc[0]);
    }
}