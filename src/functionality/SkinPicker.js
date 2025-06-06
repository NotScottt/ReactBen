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
        'assets/BenSkins/RobloxBen.png',
        'assets/BenSkins/PartyBen.png',
        'assets/BenSkins/SenfBen.png',
        'assets/BenSkins/BenBanane.png',
        'assets/BenSkins/AmericanBen.png',
        'assets/BenSkins/BratwurstBen.png',
        'assets/BenSkins/BenKatze.png',
        'assets/BenSkins/BenFortnite.png',
        'assets/BenSkins/BenKawasaki.png',
        'assets/BenSkins/BenTerror.png',
        'assets/BenSkins/BongBen.png',
        'assets/BenSkins/BenMan.png',
        'assets/BenSkins/PizzaBen.png',
        'assets/BenSkins/WasJucktMichDasBen.png',
        'assets/BenSkins/WtfBen.png',
        'assets/BenSkins/EvilBen.png',
        'assets/BenSkins/GoldenBen.png',
        'assets/BenSkins/DiamondBen.png',
        'assets/BenSkins/UltimateBen.png',
        'assets/BenSkins/TheOneAndOnlyBen.png',
    ]

    for (let index = 0; index < skinsSrc.length; index++) {
        return (skinsSrc[rebirtLevel] || skinsSrc[0]);
    }
}