import { getLevelForXP, getXPForNextLevel, getNextLevel } from '../data/levels';

export default function XPBar({ xp, level }) {
    const currentLevel = getLevelForXP(xp);
    const nextLevel = getNextLevel(currentLevel.level);
    const { progress, needed } = getXPForNextLevel(xp);

    return (
        <div className="xp-bar-widget" id="xp-bar-widget">
            <div className="xp-bar-level-badge" style={{ background: currentLevel.gradient }}>
                <span className="xp-bar-level-icon">{currentLevel.icon}</span>
                <span className="xp-bar-level-num">Lv.{currentLevel.level}</span>
            </div>
            <div className="xp-bar-content">
                <div className="xp-bar-info">
                    <span className="xp-bar-name">{currentLevel.name}</span>
                    <span className="xp-bar-xp">{xp} XP</span>
                </div>
                <div className="xp-bar-track">
                    <div
                        className="xp-bar-fill"
                        style={{
                            width: `${progress}%`,
                            background: currentLevel.gradient,
                        }}
                    />
                </div>
                {nextLevel && (
                    <div className="xp-bar-next">
                        <span>{needed} XP to {nextLevel.name} {nextLevel.icon}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
