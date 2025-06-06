const Skinlocker = ({ skins, rebirthLevel, onSkinSelect }) => {
    const skinElements = skins.map((skin, index) => {
        const unlocked = index <= rebirthLevel;
        return (
            <div
                key={index}
                style={{
                    display: "inline-block",
                    position: "relative",
                    margin: 4,
                    cursor: unlocked ? "pointer" : "not-allowed",
                    opacity: unlocked ? 1 : 0.5,
                }}
                onClick={() => unlocked && onSkinSelect && onSkinSelect(index)}
            >
                <img
                    src={skin}
                    alt={`Ben Skin ${index + 1}`}
                    className={`benSkinImage${index}`}
                    draggable="false"
                    style={{
                        width: 64,
                        height: 64,
                        filter: unlocked ? "none" : "grayscale(100%)",
                        border: unlocked ? "2px solid #4caf50" : "2px solid #aaa",
                        borderRadius: 8,
                    }}
                />
                {!unlocked && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0,0.4)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: 14,
                            borderRadius: 8,
                        }}
                    >
                        Gesperrt
                    </div>
                )}
            </div>
        );
    });

    return <>{skinElements}</>;
};

export default Skinlocker;