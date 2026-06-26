import React from 'react';

export default function XPBar({ xp }) {
    return <div style={{ background: '#eee', padding: '8px', borderRadius: '4px' }}>XP: {xp || 0}</div>;
}