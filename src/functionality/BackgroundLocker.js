const BackgroundLocker = ({ backgrounds, rebirthLevel, onBackgroundSelect }) => {
    const backgroundElements = backgrounds.map((background, index) => {
        const unlocked = index <= Math.floor(rebirthLevel / 5);
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
                onClick={() => unlocked && onBackgroundSelect && onBackgroundSelect(index)}
            >
                <img
                    src={background.src}
                    alt={`Ben background ${index + 1}`}
                    title={background.description}
                    className={`benbackgroundImage${index}`}
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
                            background: "rgba(107, 0, 168, 0.96)",
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

    return <>{backgroundElements}</>;
};

export default BackgroundLocker;