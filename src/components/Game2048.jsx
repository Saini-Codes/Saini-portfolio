import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Pure Grid Helper Functions ---

const hasValidMoves = (grid) => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 0) return true;
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return true;
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return true;
    }
  }
  return false;
};

const slideAndMergeRow = (row) => {
  const filtered = row.filter(val => val !== 0);
  const merged = [];
  let scoreGain = 0;
  const mergedIndices = []; // Tracks which elements merged
  
  for (let i = 0; i < filtered.length; i++) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      const newValue = filtered[i] * 2;
      merged.push(newValue);
      scoreGain += newValue;
      mergedIndices.push(merged.length - 1);
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }
  
  while (merged.length < 4) {
    merged.push(0);
  }
  
  return { row: merged, scoreGain, mergedIndices };
};

const moveLeft = (grid) => {
  const newGrid = [];
  let scoreGain = 0;
  let changed = false;
  const merges = []; // { r, c }
  
  for (let r = 0; r < 4; r++) {
    const { row, scoreGain: rowScore, mergedIndices } = slideAndMergeRow(grid[r]);
    newGrid.push(row);
    scoreGain += rowScore;
    if (JSON.stringify(grid[r]) !== JSON.stringify(row)) {
      changed = true;
    }
    mergedIndices.forEach(colIdx => {
      merges.push({ r, c: colIdx });
    });
  }
  return { grid: newGrid, scoreGain, changed, merges };
};

const moveRight = (grid) => {
  const newGrid = [];
  let scoreGain = 0;
  let changed = false;
  const merges = [];
  
  for (let r = 0; r < 4; r++) {
    const reversed = [...grid[r]].reverse();
    const { row, scoreGain: rowScore, mergedIndices } = slideAndMergeRow(reversed);
    const finalRow = [...row].reverse();
    newGrid.push(finalRow);
    scoreGain += rowScore;
    if (JSON.stringify(grid[r]) !== JSON.stringify(finalRow)) {
      changed = true;
    }
    mergedIndices.forEach(revColIdx => {
      // Convert reverse index back to normal index
      const colIdx = 3 - revColIdx;
      merges.push({ r, c: colIdx });
    });
  }
  return { grid: newGrid, scoreGain, changed, merges };
};

const moveUp = (grid) => {
  const transposed = [];
  for (let c = 0; c < 4; c++) {
    const row = [];
    for (let r = 0; r < 4; r++) {
      row.push(grid[r][c]);
    }
    transposed.push(row);
  }
  
  const { grid: movedTransposed, scoreGain, changed, merges: transposedMerges } = moveLeft(transposed);
  
  const result = [];
  for (let c = 0; c < 4; c++) {
    const row = [];
    for (let r = 0; r < 4; r++) {
      row.push(movedTransposed[r][c]);
    }
    result.push(row);
  }
  
  let hasChanged = false;
  for (let r = 0; r < 4; r++) {
    if (JSON.stringify(grid[r]) !== JSON.stringify(result[r])) {
      hasChanged = true;
    }
  }

  // Transpose merges: r becomes c, c becomes r
  const merges = transposedMerges.map(m => ({ r: m.c, c: m.r }));
  
  return { grid: result, scoreGain, changed: hasChanged, merges };
};

const moveDown = (grid) => {
  const transposed = [];
  for (let c = 0; c < 4; c++) {
    const row = [];
    for (let r = 0; r < 4; r++) {
      row.push(grid[r][c]);
    }
    transposed.push(row);
  }
  
  const { grid: movedTransposed, scoreGain, changed, merges: transposedMerges } = moveRight(transposed);
  
  const result = [];
  for (let c = 0; c < 4; c++) {
    const row = [];
    for (let r = 0; r < 4; r++) {
      row.push(movedTransposed[r][c]);
    }
    result.push(row);
  }
  
  let hasChanged = false;
  for (let r = 0; r < 4; r++) {
    if (JSON.stringify(grid[r]) !== JSON.stringify(result[r])) {
      hasChanged = true;
    }
  }

  const merges = transposedMerges.map(m => ({ r: m.c, c: m.r }));
  
  return { grid: result, scoreGain, changed: hasChanged, merges };
};

// --- Tile colors matching specs ---
const getTileStyles = (value) => {
  let bg = '#3c3a32'; // Super tiles (>2048)
  let text = '#f9f6f0'; // White text
  
  switch (value) {
    case 2: bg = '#eee4da'; text = '#776e65'; break;
    case 4: bg = '#ede0c8'; text = '#776e65'; break;
    case 8: bg = '#f2b179'; break;
    case 16: bg = '#f59563'; break;
    case 32: bg = '#f67c5f'; break;
    case 64: bg = '#f65e3b'; break;
    case 128: bg = '#edcf72'; break;
    case 256: bg = '#edcc61'; break;
    case 512: bg = '#edc850'; break;
    case 1024: bg = '#edc53f'; break;
    case 2048: bg = '#edc22e'; break;
    default: break;
  }
  
  return { backgroundColor: bg, color: text };
};

const CSS_ANIMATIONS = `
  @keyframes spawnTile {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes popTile {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  .tile-new-anim {
    animation: spawnTile 150ms ease-out forwards;
  }
  .tile-merged-anim {
    animation: popTile 100ms ease-in-out forwards;
  }
`;

export default function Game2048() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);
  
  const [gridConfig, setGridConfig] = useState({
    width: 400,
    cellSize: 90,
    gap: 10,
    padding: 5
  });

  const nextTileIdRef = useRef(0);
  const gridContainerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Handle responsiveness dynamically
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setGridConfig({ width: 280, cellSize: 62, gap: 6, padding: 7 });
      } else if (w < 768) {
        setGridConfig({ width: 320, cellSize: 72, gap: 8, padding: 4 });
      } else {
        setGridConfig({ width: 400, cellSize: 90, gap: 10, padding: 5 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Spawn a tile in a random empty spot
  const spawnRandomTile = useCallback((grid) => {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (grid[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }
    
    if (emptyCells.length === 0) return { grid, cell: null };
    
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const val = Math.random() < 0.9 ? 2 : 4;
    
    const nextGrid = grid.map((rowArr, r) =>
      rowArr.map((cellVal, c) => (r === randomCell.r && c === randomCell.c ? val : cellVal))
    );
    
    return { grid: nextGrid, cell: { r: randomCell.r, c: randomCell.c, val } };
  }, []);

  // Sync state tiles array with current numerical grid
  const syncTiles = useCallback((grid, merges = [], spawnedCell = null) => {
    setTiles((prevTiles) => {
      const nextTilesList = [];
      const usedPrevIds = new Set();

      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const val = grid[r][c];
          if (val === 0) continue;

          // If this is the newly spawned cell, create a fresh tile
          if (spawnedCell && spawnedCell.r === r && spawnedCell.c === c && spawnedCell.val === val) {
            nextTilesList.push({
              id: nextTileIdRef.current++,
              row: r,
              col: c,
              value: val,
              isNew: true,
              isMerged: false
            });
            continue;
          }

          // Try to match from previous tiles to trigger slide transitions
          let match = prevTiles.find(t => 
            !usedPrevIds.has(t.id) && 
            t.value === val && 
            (t.row === r || t.col === c)
          );

          if (!match) {
            match = prevTiles.find(t => !usedPrevIds.has(t.id) && t.value === val);
          }

          if (!match) {
            match = prevTiles.find(t => !usedPrevIds.has(t.id));
          }

          if (match) {
            usedPrevIds.add(match.id);
            const isMerged = merges.some(m => m.r === r && m.c === c);
            nextTilesList.push({
              id: match.id,
              row: r,
              col: c,
              value: val,
              isNew: false,
              isMerged
            });
          } else {
            nextTilesList.push({
              id: nextTileIdRef.current++,
              row: r,
              col: c,
              value: val,
              isNew: true,
              isMerged: false
            });
          }
        }
      }
      return nextTilesList;
    });
  }, []);

  // Start a fresh game
  const startNewGame = useCallback(() => {
    const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    
    const firstSpawn = spawnRandomTile(emptyGrid);
    const secondSpawn = spawnRandomTile(firstSpawn.grid);
    
    setBoard(secondSpawn.grid);
    setScore(0);
    setHasWon(false);
    setGameOver(false);
    setKeepPlaying(false);
    
    // Set initial tiles list
    const initialTiles = [];
    secondSpawn.grid.forEach((rowArr, r) => {
      rowArr.forEach((val, c) => {
        if (val !== 0) {
          initialTiles.push({
            id: nextTileIdRef.current++,
            row: r,
            col: c,
            value: val,
            isNew: true,
            isMerged: false
          });
        }
      });
    });
    setTiles(initialTiles);
  }, [spawnRandomTile]);

  // Load Best Score on Mount & Reset Game
  useEffect(() => {
    const best = localStorage.getItem('2048_best');
    if (best) {
      setBestScore(parseInt(best, 10));
    }
    startNewGame();
  }, []);

  // Process Move Trigger
  const processMove = useCallback((direction) => {
    if (gameOver) return;
    if (hasWon && !keepPlaying) return;

    let result;
    switch (direction) {
      case 'LEFT': result = moveLeft(board); break;
      case 'RIGHT': result = moveRight(board); break;
      case 'UP': result = moveUp(board); break;
      case 'DOWN': result = moveDown(board); break;
      default: return;
    }

    if (!result.changed) return;

    // Spawn a random tile on the moved grid
    const { grid: finalGrid, cell: spawnedCell } = spawnRandomTile(result.grid);

    // Update board state
    setBoard(finalGrid);

    // Update score
    setScore((prev) => {
      const next = prev + result.scoreGain;
      if (next > bestScore) {
        setBestScore(next);
        localStorage.setItem('2048_best', next.toString());
      }
      return next;
    });

    // Check Win condition (first time reaching 2048)
    const winDetected = finalGrid.some(row => row.some(cell => cell === 2048));
    if (winDetected && !keepPlaying && !hasWon) {
      setHasWon(true);
    }

    // Check Lose condition (no valid moves left)
    if (!hasValidMoves(finalGrid)) {
      setGameOver(true);
    }

    // Sync tiles list
    syncTiles(finalGrid, result.merges, spawnedCell);
  }, [board, gameOver, hasWon, keepPlaying, bestScore, spawnRandomTile, syncTiles]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (hasWon && !keepPlaying) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          processMove('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          processMove('RIGHT');
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          processMove('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          processMove('DOWN');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [processMove, gameOver, hasWon, keepPlaying]);

  // Touch Swipe Gesture Listener with scroll locking
  useEffect(() => {
    const container = gridContainerRef.current;
    if (!container) return;

    const preventDefault = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const threshold = 30; // Min swipe distance

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > threshold) {
          processMove(deltaX > 0 ? 'RIGHT' : 'LEFT');
        }
      } else {
        if (Math.abs(deltaY) > threshold) {
          processMove(deltaY > 0 ? 'DOWN' : 'UP');
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', preventDefault, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', preventDefault);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [processMove]);

  // 16 Grid Placeholder Cells
  const placeholders = Array.from({ length: 16 }).map((_, idx) => (
    <div
      key={idx}
      className="bg-brand-bg/40 rounded-lg border border-brand-border/40"
      style={{
        width: `${gridConfig.cellSize}px`,
        height: `${gridConfig.cellSize}px`
      }}
    />
  ));

  return (
    <div
      className="w-full flex flex-col items-center select-none"
      style={{ maxWidth: '440px', margin: '0 auto' }}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS_ANIMATIONS }} />

      {/* Score and Reset Header */}
      <div className="w-full flex justify-between items-center mb-5 font-mono">
        <div className="flex gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-brand-card border border-brand-border text-center shadow-md">
            <div className="text-[10px] text-brand-text-muted uppercase tracking-wider">Score</div>
            <div className="text-base md:text-lg font-extrabold text-[#00ff88]">{score}</div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-brand-card border border-brand-border text-center shadow-md">
            <div className="text-[10px] text-brand-text-muted uppercase tracking-wider">Best</div>
            <div className="text-base md:text-lg font-extrabold text-[#ff4444]">{bestScore}</div>
          </div>
        </div>

        <button
          onClick={startNewGame}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-[#00ff88] text-brand-bg font-extrabold text-xs uppercase tracking-wider hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
        >
          New Game
        </button>
      </div>

      {/* Main 4x4 Grid Container */}
      <div
        ref={gridContainerRef}
        className="relative bg-brand-card/75 border border-brand-border/80 rounded-2xl shadow-2xl relative touch-none overflow-hidden"
        style={{
          width: `${gridConfig.width}px`,
          height: `${gridConfig.width}px`
        }}
      >
        {/* Background cells */}
        <div
          className="grid h-full w-full justify-center items-center"
          style={{
            gridTemplateColumns: `repeat(4, ${gridConfig.cellSize}px)`,
            gap: `${gridConfig.gap}px`,
            padding: `${gridConfig.padding}px`
          }}
        >
          {placeholders}
        </div>

        {/* Active sliding tiles */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ padding: `${gridConfig.padding}px` }}
        >
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="absolute transition-transform duration-100 ease-in-out"
              style={{
                width: `${gridConfig.cellSize}px`,
                height: `${gridConfig.cellSize}px`,
                transform: `translate(${tile.col * (gridConfig.cellSize + gridConfig.gap)}px, ${tile.row * (gridConfig.cellSize + gridConfig.gap)}px)`
              }}
            >
              <div
                className={`w-full h-full rounded-lg flex items-center justify-center font-extrabold text-center shadow-md select-none border border-black/10 ${
                  tile.isNew ? 'tile-new-anim' : ''
                } ${tile.isMerged ? 'tile-merged-anim' : ''}`}
                style={{
                  ...getTileStyles(tile.value),
                  fontSize: 'clamp(18px, 4vw, 32px)',
                  lineHeight: 1
                }}
              >
                {tile.value}
              </div>
            </div>
          ))}
        </div>

        {/* WIN Overlay */}
        {hasWon && !keepPlaying && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#052e16]/85 backdrop-blur-sm px-6 text-center animate-fade-in">
            <h2 className="text-3xl font-extrabold text-[#00ff88] tracking-tight mb-2 uppercase animate-bounce">
              YOU WIN! 🎉
            </h2>
            <p className="text-xs text-brand-text-muted mb-6">
              You've successfully reached the 2048 tile!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setKeepPlaying(true)}
                className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-brand-text font-bold text-xs uppercase cursor-pointer transition-all border border-brand-border"
              >
                Keep Going
              </button>
              <button
                onClick={startNewGame}
                className="px-5 py-2.5 rounded-lg bg-[#00ff88] text-brand-bg font-extrabold text-xs uppercase cursor-pointer hover:opacity-90 transition-all"
              >
                New Game
              </button>
            </div>
          </div>
        )}

        {/* LOSE Overlay */}
        {gameOver && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#450a0a]/90 backdrop-blur-sm px-6 text-center animate-fade-in">
            <h2 className="text-3xl font-extrabold text-[#ff4444] tracking-tight mb-2 uppercase animate-pulse">
              GAME OVER
            </h2>
            <div className="h-0.5 w-12 bg-[#ff4444] rounded mb-6"></div>

            <div className="flex gap-6 mb-8 font-mono text-sm text-brand-text">
              <div>
                <p className="text-[10px] text-brand-text-muted uppercase">Score</p>
                <p className="text-xl font-bold text-[#00ff88] mt-1">{score}</p>
              </div>
              <div className="border-r border-brand-border/40"></div>
              <div>
                <p className="text-[10px] text-brand-text-muted uppercase">Best</p>
                <p className="text-xl font-bold text-brand-primary mt-1">{bestScore}</p>
              </div>
            </div>

            <button
              onClick={startNewGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-[#ff4444] text-brand-bg font-extrabold text-xs uppercase tracking-wider hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Guide assistance */}
      <p className="mt-4 font-mono text-[10px] text-brand-text-muted text-center uppercase tracking-wider">
        Swipe or use Keyboard Arrow keys / WASD to merge tiles
      </p>
    </div>
  );
}
