import { useEffect, useState } from 'react';
import { LEVELS } from '../data/levels';

export default function LevelUpModal({ levelUpData, onDismiss }) {
    const [visible, setVisible] = useState(false);

    const levelData = levelUpData ? LEVELS.find(l => l.level === levelUpData.level) : null;

    useEffect(() => {
        if (levelUpData) {
            // Small delay for mount animation
            const timer = setTimeout(() => setVisible(true), 50);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [levelUpData]);

    if (!levelUpData || !levelData) return null;

    const handleDismiss = () => {
        setVisible(false);
        setTimeout(onDismiss, 300);
    };

    return (
        <div className={`level-up-overlay ${visible ? 'active' : ''}`} onClick={handleDismiss}>
            <div className={`level-up-modal ${visible ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                <div className="level-up-glow" style={{ background: levelData.gradient }} />
                <div className="level-up-content">
                    <div className="level-up-sparkles">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="level-up-sparkle"
                                style={{
                                    '--delay': `${i * 0.1}s`,
                                    '--angle': `${i * 30}deg`,
                                    '--distance': `${60 + Math.random() * 40}px`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="level-up-icon-container" style={{ background: levelData.gradient }}>
                        <span className="level-up-icon">{levelData.icon}</span>
                    </div>
                    <h2 className="level-up-title">Level Up!</h2>
                    <div className="level-up-level" style={{ color: levelData.color }}>
                        Level {levelData.level}
                    </div>
                    <div className="level-up-name">{levelData.name}</div>
                    <div className="level-up-unlocks">
                        <span className="level-up-unlocks-label">🔓 Unlocked:</span>
                        <span>{levelData.unlocksDescription}</span>
                    </div>
                    <button className="btn btn-primary level-up-btn" onClick={handleDismiss}>
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    );
}
