import React, { useState, useEffect } from 'react'
import '../style/style.css'

function Square({ value, onClick }) {
    return (
        <button className={`square ${value}`} onClick={onClick}>{value}</button>
    )
}

function Restart({ onClick }) {
    return (
        <button className='reset-game-btn' onClick={onClick}>Play Again!</button>
    )
}

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isNextX, setIsNextX] = useState(true)
    const [playWithSystem, setPlayWithSystem] = useState('system')

    useEffect(() => {
        if (!isNextX && playWithSystem === 'system' && !winner) {
            const randomSquare = Math.floor(Math.random() * 10)
            computerPlayer(randomSquare)
            // console.log('Random num', randomSquare)
            // console.log(XO)
        }

    }, [isNextX, playWithSystem])

    const XO = isNextX ? 'X' : 'O'
    const winner = calculateWinner(squares)

    function getStatus() {
        if (winner) {
            return `Winner: ${winner}`
        } else if (isBoardFull(squares)) {
            return 'Draw!'
        } else {
            return `Player Turn: ${XO}`
        }
    }

    function renderSquare(i) {
        return (
            <Square
                value={squares[i]}
                onClick={() => {
                    if (squares[i] !== null || winner !== null) {
                        return
                    }
                    const nextSquares = squares.slice()
                    nextSquares[i] = XO
                    setSquares(nextSquares)

                    setIsNextX(!isNextX)
                }}
            />
        )
    }

    function renderReset() {
        return (
            <Restart
                onClick={() => {
                    setSquares(Array(9).fill(null))
                    setIsNextX(true)
                }}
            />
        )
    }

    const computerPlayer = (randomNum) => {
        if (randomNum <= squares.length) {
            if (squares[randomNum] !== null || winner !== null) {
                for (let i = 0; i < squares.length; i++) {
                    if (squares[i] == null) {
                        
                        const nextSquares = squares.slice()
                        nextSquares[i] = XO
                        setSquares(nextSquares)
                        setIsNextX(!isNextX)
                    }
                }
            } else if (squares[randomNum] == null) {
                const nextSquares = squares.slice()
                nextSquares[randomNum] = XO
                setSquares(nextSquares)

                setIsNextX(!isNextX)
            }
        }

    }

    return (
        <div className='container'>
            <h1 className='header'>Tic-Tac-Toe</h1>
            <div className='game-board'>
                <div className='game-board-row'>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className='game-board-row'>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className='game-board-row'>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <div className='game-status'>
                {getStatus()}
            </div>
            <div className='player-status'>
                <select className='player' value={playWithSystem} onChange={(e) => setPlayWithSystem(e.target.value)}>
                    <option className='player-option' value='system'>Play With Computer</option>
                    <option className='player-option' value='twoPlayer'>Two Players</option>
                </select>
            </div>
            <div className='reset-game'>
                {renderReset()}
            </div>
        </div>
    )
}

function calculateWinner(squares) {
    const possibleLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
        const [a, b, c] = possibleLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == null) {
            return false
        }
    }
    return true
}

export default Game