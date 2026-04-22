import React, { useState, useEffect, useRef } from 'react';
import { ref, onValue, set, update, remove, get } from 'firebase/database';
import { db } from '../../config/firebase';
import { SOAL_MISA, SOAL_IBADAH } from '../../data/questions';
import confetti from 'canvas-confetti';

// --- SOUNDS ---
const SFX = {
  correct: new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_bb6300843e.mp3'),
  wrong:   new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c3523a58c2.mp3'),
  start:   new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_165686008b.mp3'),
  finish:  new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'),
};
const bgMusic = new Audio('https://cdn.pixabay.com/audio/2024/02/09/audio_65123d6a66.mp3'); // Upbeat Game Show BGM
bgMusic.loop = true; bgMusic.volume = 0.25;
const playFX = (s) => { s.currentTime = 0; s.play().catch(() => {}); };

// ========================================================
// MUSIC INDICATOR
// ========================================================
function MusicIndicator({ musicOn, onToggle }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-0.5" style={{ height: 16 }}>
        {[0,1,2,3].map(i => (
          <div key={i} className={`music-bar ${musicOn ? '' : 'opacity-20'}`} style={{ animationDelay: `${[0,0.2,0.4,0.1][i]}s` }} />
        ))}
      </div>
      <span className="text-white/50 text-xs">{musicOn ? 'Musik ON' : 'OFF'}</span>
      <button onClick={onToggle} className="btn btn-gray text-sm px-2 py-1">🎵</button>
    </div>
  );
}

// ========================================================
// LOBBY SCREEN
// ========================================================
function LobbyScreen({ players, onStart, onReset, musicOn, onToggleMusic, selectedCategory, setSelectedCategory, isLocked, onToggleLock }) {
  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 gap-6" style={{ background: '#0a0a1a' }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-title text-2xl sm:text-3xl leading-tight" style={{ color: 'var(--gold)', textShadow: '0 0 20px rgba(245,197,24,0.6)' }}>
            NEWDOWN KUIS<br />FPK KEMAHKRIS INSTIKI 2026
          </h1>
          <p className="text-sm text-white/50 mt-1">Dashboard · oleh sie acara</p>
        </div>
        <MusicIndicator musicOn={musicOn} onToggle={onToggleMusic} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Player List */}
        <div className="lg:col-span-2 dash-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-title text-xl" style={{ color: 'var(--gold)' }}>PESERTA TERDAFTAR</h2>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulseDot 1.5s ease infinite' }} />
              <span className="text-white/60 text-sm">Live · {players.length} orang</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto" style={{ maxHeight: 380 }}>
            {players.length === 0
              ? <div className="text-white/30 text-sm italic col-span-3 text-center py-8">Menunggu peserta bergabung...</div>
              : players.map((p, i) => (
                <div key={i} className="player-card">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#6c3fc5,#9b6dff)' }}>{p.nama?.[0] || '?'}</div>
                  <span className="font-bold text-sm truncate">{p.nama}</span>
                </div>
              ))
            }
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="dash-card p-5 text-center">
            <div className="text-5xl font-title mb-2" style={{ color: 'var(--gold)' }}>{players.length}</div>
            <div className="text-white/50 text-sm uppercase tracking-widest">Peserta Siap</div>
          </div>
          <div className="dash-card p-5 text-center flex-1 flex flex-col justify-center">
            <div className="text-5xl font-title mb-2" style={{ color: 'var(--gold)' }}>{players.length}</div>
            <div className="text-white/50 text-sm uppercase tracking-widest">Peserta Siap</div>
          </div>
          
          <div className="dash-card p-4 flex flex-col gap-3">
            <div className="text-xs text-white/40 uppercase tracking-widest">Pengaturan Kuis</div>
            
            <div className="flex bg-black/40 p-1 rounded-lg">
              <button 
                onClick={() => !isLocked && setSelectedCategory('misa')}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${selectedCategory === 'misa' ? 'bg-gold text-black' : 'text-white/50 hover:text-white'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={selectedCategory === 'misa' ? { background: 'var(--gold)' } : {}}
              >MISA</button>
              <button 
                onClick={() => !isLocked && setSelectedCategory('ibadah')}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${selectedCategory === 'ibadah' ? 'bg-gold text-black' : 'text-white/50 hover:text-white'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={selectedCategory === 'ibadah' ? { background: 'var(--gold)' } : {}}
              >IBADAH</button>
            </div>

            <button 
              onClick={onToggleLock} 
              className={`py-2 text-sm font-bold rounded-lg transition-all ${isLocked ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
            >
              {isLocked ? '🔒 KATEGORI DIKUNCI' : '🔓 KUNCI KATEGORI INI'}
            </button>
          </div>

          <button onClick={onStart} className="btn btn-gold text-lg py-4 w-full mt-auto">▶ MULAI KUIS</button>
          <button onClick={onReset} className="btn btn-red text-sm py-3 w-full">🗑 RESET SEMUA DATA</button>
        </div>
      </div>

      {/* Live leaderboard */}
      <div className="dash-card p-5">
        <h3 className="font-title text-sm mb-3" style={{ color: 'var(--gold)' }}>LIVE LEADERBOARD</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {players.length === 0
            ? <div className="text-white/30 text-sm italic">Belum ada poin...</div>
            : players.slice(0, 5).map((p, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <span style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '0.8rem' }}>{i + 1}</span>
                <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{p.nama}</span>
                <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700 }}>{p.points || 0}pts</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

// ========================================================
// COUNTDOWN SCREEN
// ========================================================
function CountdownScreen({ count }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#0a0a1a' }}>
      <div className="text-white/50 font-title text-xl tracking-widest uppercase">Bersiap...</div>
      <div className="font-title" style={{ fontSize: 'clamp(8rem,20vw,14rem)', color: 'white', fontStyle: 'italic', textShadow: '8px 8px 0 var(--gold), 0 0 60px rgba(245,197,24,0.4)', animation: 'cdAnim 0.9s ease-out infinite' }}>
        {count}
      </div>
      <div className="text-white/40 text-sm">Semua peserta sudah terhubung</div>
    </div>
  );
}

// ========================================================
// LIVE DASHBOARD SCREEN (GANTI QUIZ SCREEN LAMA)
// ========================================================
function LiveDashboardScreen({ players, onFinish }) {
  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-5 gap-4" style={{ background: '#0a0a1a' }}>
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between dash-card p-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full" style={{ background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulseDot 1.5s ease infinite' }} />
          <h2 className="font-title text-lg sm:text-xl" style={{ color: 'var(--gold)' }}>LIVE SCOREBOARD</h2>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-none border-white/10 pt-3 sm:pt-0">
          <div className="text-left sm:text-right">
            <div className="text-white/40 text-[10px] uppercase tracking-widest">Peserta</div>
            <div className="font-bold text-lg sm:text-xl">{players.length}</div>
          </div>
          <button onClick={onFinish} className="btn btn-purple text-xs sm:text-sm px-4 sm:px-6 py-3">
            🏆 <span className="hidden sm:inline">AKHIRI KUIS & </span>HASIL
          </button>
        </div>
      </div>

      <div className="dash-card p-4 sm:p-6 flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Header Grid */}
        <div className="grid grid-cols-12 gap-2 text-white/40 text-[10px] uppercase tracking-widest font-bold px-2 mb-2">
          <div className="col-span-2">RANK</div>
          <div className="col-span-5">PESERTA</div>
          <div className="col-span-2 text-center">BNR</div>
          <div className="col-span-3 text-right">POIN</div>
        </div>
        
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-10" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {players.map((p, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center bg-white/5 rounded-xl p-3 sm:p-4 border border-white/5 transition-all duration-500" 
                 style={{ 
                   borderColor: i===0 ? 'rgba(245,197,24,0.4)' : i===1 ? 'rgba(156,163,175,0.4)' : i===2 ? 'rgba(205,127,50,0.4)' : 'rgba(255,255,255,0.05)',
                   background: i===0 ? 'rgba(245,197,24,0.1)' : ''
                 }}>
              <div className="col-span-2 font-title text-xl sm:text-2xl" style={{ color: i===0?'var(--gold)':i===1?'#9ca3af':i===2?'#cd7f32':'rgba(255,255,255,0.4)' }}>
                #{i+1}
              </div>
              <div className="col-span-5 flex items-center gap-2 sm:gap-4 overflow-hidden">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#6c3fc5,#9b6dff)' }}>{p.nama?.[0]||'?'}</div>
                <span className="font-bold text-sm sm:text-lg truncate">{p.nama}</span>
              </div>
              <div className="col-span-2 text-center font-bold text-green-400 text-sm sm:text-lg">
                {p.benar || 0}
              </div>
              <div className="col-span-3 text-right font-title text-xl sm:text-2xl" style={{ color: 'var(--gold)' }}>
                {p.points || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========================================================
// FINISH SCREEN
// ========================================================
function FinishScreen({ players, onBackToLobby }) {
  const top3 = players.slice(0, 3);

  useEffect(() => {
    confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
    const t = setInterval(() => confetti({ particleCount: 50, spread: 80, origin: { x: Math.random(), y: Math.random() * 0.5 } }), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8" style={{ background: '#0a0a1a' }}>
      <div className="text-center">
        <div className="font-title text-3xl sm:text-4xl leading-tight" style={{ color: 'var(--gold)', textShadow: '0 0 20px rgba(245,197,24,0.6)' }}>
          NEWDOWN KUIS<br />FPK KEMAHKRIS INSTIKI 2026
        </div>
        <p className="text-white/50 mt-2">oleh sie acara — Kuis Selesai!</p>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-3 sm:gap-6 w-full max-w-lg" style={{ height: 220 }}>
        {[{ idx: 1, medal: '🥈', h: 120, grad: '#9ca3af,#6b7280', size: 'sm' },
          { idx: 0, medal: '🥇', h: 160, grad: 'var(--gold),var(--gold2)', size: 'base' },
          { idx: 2, medal: '🥉', h: 90,  grad: '#cd7f32,#a0522d', size: 'sm' }
        ].map(({ idx, medal, h, grad, size }) => (
          <div key={idx} className="flex-1 text-center">
            <div className="mb-2">
              <div className={`text-${size === 'sm' ? '2xl' : '3xl'}`}>{medal}</div>
              <div className={`font-bold text-${size === 'sm' ? 'sm text-white/80' : 'base text-white'} truncate`}>{top3[idx]?.nama || '—'}</div>
              <div className="text-yellow-400 text-xs font-bold">{top3[idx]?.points || 0} pts</div>
            </div>
            <div className="rounded-t-xl flex items-end justify-center pb-2" style={{ height: h, background: `linear-gradient(180deg,${grad})` }} />
          </div>
        ))}
      </div>

      {/* Full ranking */}
      <div className="dash-card p-5 w-full max-w-lg">
        <h3 className="font-title text-sm mb-4" style={{ color: 'var(--gold)' }}>RANKING LENGKAP</h3>
        <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: 240 }}>
          {players.map((p, i) => (
            <div key={i} className="lb-row">
              <span className="font-bold text-white/40 w-6 text-sm">{i + 1}</span>
              <span className="flex-1 font-bold text-sm">{p.nama}</span>
              <span className="text-yellow-400 font-bold text-sm">{p.points || 0} pts</span>
              <span className="text-white/30 text-xs">{p.benar || 0} benar</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onBackToLobby} className="btn btn-gold px-10 py-4 text-lg">↩ KEMBALI KE LOBBY</button>
    </div>
  );
}

// ========================================================
// MAIN DASHBOARD APP
// ========================================================
export default function DashboardApp() {
  const [screen, setScreen] = useState('lobby');
  const [players, setPlayers] = useState([]);
  const [musicOn, setMusicOn] = useState(true);
  const [finishPlayers, setFinishPlayers] = useState([]);
  const [countNum, setCountNum] = useState(3);
  
  const [selectedCategory, setSelectedCategory] = useState('misa');
  const [isLocked, setIsLocked] = useState(false);

  // Listen to players
  useEffect(() => {
    const unsub = onValue(ref(db, 'peserta'), snap => {
      const data = snap.val();
      if (!data) { setPlayers([]); return; }
      const sorted = Object.values(data).sort((a, b) => (b.points || 0) - (a.points || 0));
      setPlayers(sorted);
    });
    return unsub;
  }, []);



  // Listen to game state to sync lock
  useEffect(() => {
    const unsub = onValue(ref(db, 'gameState'), snap => {
      const state = snap.val() || {};
      if (state.categoryLock) {
        setIsLocked(true);
        setSelectedCategory(state.categoryLock);
      } else {
        setIsLocked(false);
      }
    });
    return unsub;
  }, []);

  const handleToggleLock = () => {
    if (isLocked) {
      update(ref(db, 'gameState'), { categoryLock: null });
      setIsLocked(false);
    } else {
      update(ref(db, 'gameState'), { categoryLock: selectedCategory });
      setIsLocked(true);
    }
  };

  const handleStart = async () => {
    const snap = await get(ref(db, 'peserta'));
    if (!snap.exists()) { alert('Belum ada peserta yang bergabung!'); return; }
    playFX(SFX.start);
    if (musicOn) bgMusic.play().catch(() => {});
    setScreen('countdown');
    let count = 3;
    setCountNum(count);
    update(ref(db, 'gameState'), { status: 'countdown', count });
    const cdInt = setInterval(() => {
      count--;
      if (count > 0) { setCountNum(count); update(ref(db, 'gameState'), { status: 'countdown', count }); }
      else if (count === 0) { setCountNum('GO!'); update(ref(db, 'gameState'), { status: 'countdown', count: 'GO!' }); }
      else {
        clearInterval(cdInt);
        const bankSoal = selectedCategory === 'misa' ? SOAL_MISA : SOAL_IBADAH;
        set(ref(db, 'bankSoal'), bankSoal);
        update(ref(db, 'gameState'), { status: 'start', categoryLock: isLocked ? selectedCategory : null });
        setScreen('live');
      }
    }, 1000);
  };

  const handleFinish = async () => {
    playFX(SFX.finish);
    update(ref(db, 'gameState'), { status: 'finish' });
    setScreen('finish');
    confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
    const snap = await get(ref(db, 'peserta'));
    if (snap.exists()) {
      const sorted = Object.values(snap.val()).sort((a, b) => (b.points || 0) - (a.points || 0));
      setFinishPlayers(sorted);
    }
  };

  const handleReset = () => {
    if (!confirm('Hapus semua data peserta dan reset kuis?')) return;
    remove(ref(db, 'peserta'));
    remove(ref(db, 'timer'));
    remove(ref(db, 'bankSoal'));
    set(ref(db, 'gameState'), { status: 'lobby', categoryLock: null });
    setIsLocked(false);
    setScreen('lobby');
  };

  const handleBackToLobby = () => {
    set(ref(db, 'gameState'), { status: 'lobby' });
    setScreen('lobby');
    setFinishPlayers([]);
  };

  const toggleMusic = () => {
    setMusicOn(m => {
      const next = !m;
      if (next) bgMusic.play().catch(() => {}); else bgMusic.pause();
      return next;
    });
  };

  return (
    <>
      {screen === 'lobby' && <LobbyScreen players={players} onStart={handleStart} onReset={handleReset} musicOn={musicOn} onToggleMusic={toggleMusic} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} isLocked={isLocked} onToggleLock={handleToggleLock} />}
      {screen === 'countdown' && <CountdownScreen count={countNum} />}
      {screen === 'live' && <LiveDashboardScreen players={players} onFinish={handleFinish} />}
      {screen === 'finish' && <FinishScreen players={finishPlayers} onBackToLobby={handleBackToLobby} />}
      
      <footer className="fixed bottom-2 left-0 right-0 text-center pointer-events-none z-50">
        <p className="text-white/10 text-[10px] tracking-[0.3em] uppercase">By Flyxa Dev</p>
      </footer>
    </>
  );
}
