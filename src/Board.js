import React, { Component } from 'react'
import Square from './Square';

export default class Board extends Component {
    state = {
        cells: [
            '', '', '', '', '', '', '', '', ''
        ],
        player: 'X',
        winner: '',
        btnVisibility: false
    }

    checkIfWon = () => {
        const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const symbols = this.state.cells;
        return winCombos.find(combo => {
            if (symbols.indexOf('') === -1) {
                this.setState({
                    cells: [
                        '', '', '', '', '', '', '', '', ''
                    ],
                    player: 'X',
                    winner: '',
                    btnVisibility: false
                });
                return false;
            }
            if (symbols[combo[0]] && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[0]] === symbols[combo[2]]) {
                return true;
            } else {                  
                return false;
            }
        })
    }

    handleClick(index) {
        let cells = this.state.cells;
        if (cells[index] !== '') {
            return;
        }
        cells[index] = this.state.player;
        this.setState({
            cells
        });
        this.checkIfWon();
        if (this.checkIfWon()) {
            this.setState({
                winner: this.state.player,
                btnVisibility: true
            })
        } else {
            this.setState({
                player: this.state.player === 'X' ? 'O' : 'X'
            })
        }
    }

    buttonClick() {
        this.setState({
            cells: [
                '', '', '', '', '', '', '', '', ''
            ],
            player: 'X',
            winner: '',
            btnVisibility: false
        });
    }

    render() {

        return (
            <React.Fragment>
                {this.state.cells.map((cell, index) => {
                    return (
                        <Square onclick={() => this.handleClick(index)} key={index} value={this.state.cells[index]} />
                    )
                })}
                <div className="result">{this.state.winner === '' ? `Next player: ${this.state.player}` : `Winner: ${this.state.winner}`}</div>
                <button onClick={() => this.buttonClick()} style={this.state.btnVisibility ? {visibility: 'visible'} : {visibility: 'hidden'}}>Try again</button>
            </React.Fragment>
        )
    }
}
