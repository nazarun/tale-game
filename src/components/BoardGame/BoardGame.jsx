import React from "react";
import Tale from './Tale';
import './boardGame.scss';

const COVER = '#387cff';
const SIZE = 8;
const IMAGES = [
    'red',
    'orange',
    'green',
    'violet',
    'grey',
    'azure',
    'blue',
    'yellow',
];

class BoardGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tales : this.prepareTales(),
            timer: 0,
            roundsCount: 0,
            isProcessing: false,
            chosenTales: [],
            victory: false,
        }
    }

    prepareTales = () => {
        let talesArray = [];
        for (let y = 0; y < 2;) {
            for (let x = 0; x < SIZE; x++) {
                let tale = {
                    id: x,
                    img: IMAGES[x],
                    uniqueId: y === 0 ? x : talesArray.length,
                    opened: false,
                    isSolved: false,
                };
                talesArray.push(tale);
            }
            y++;
        }
        talesArray.sort(() => Math.random() - 0.5);
        return talesArray;
    };

    startGame = () => {
        this.setState({
            tales : this.prepareTales(),
            victory : false,
            roundsCount : 0,
            timer: 0,
        })
    };

    handleClick = (e, tale) => {
        e.persist();

        const listToChange = this.state.tales;
        const index = listToChange.findIndex(item => item.uniqueId === tale.uniqueId);
        listToChange[index].opened = !listToChange[index].opened;

        let chosenTales = this.state.chosenTales;
        if (chosenTales.length < 1) {
            chosenTales.push(tale.id);
            this.setState({
                tales : listToChange,
                chosenTales : chosenTales,
            });

        } else {
            chosenTales.push(tale.id);
            this.setState({
                tales : listToChange,
                isProcessing : true,
            });
            setTimeout(() => {this.compareTales(chosenTales)}, 1500);
        }
    };

    compareTales = chosenTales => {
        const listToChange = this.state.tales;

        if (chosenTales[0] === chosenTales[1]) {
            listToChange.forEach(item => {
                if (item.id === chosenTales[0] || item.id === chosenTales[1]) {
                    item.isSolved = true;
                }
            });

            this.setState({
                tales : listToChange,
                chosenTales : [],
                roundsCount : this.state.roundsCount + 1,
                isProcessing : false,
            });

            if (this.state.tales.every(item => item.isSolved)) {
                this.setState({victory : true})
            }

        } else {
            listToChange.forEach(item => {
                if (item.id === chosenTales[0] || item.id === chosenTales[1]) {
                    item.opened = false;
                }
            });

            this.setState({
                tales : listToChange,
                chosenTales : [],
                roundsCount : this.state.roundsCount + 1,
                isProcessing : false,
            });
        }
    };

    render () {
        return (
            <div>
                <p>Board of Tales Game</p>
                <p>rounds count: {this.state.roundsCount}</p>
                {this.state.victory ?
                    <div>
                        <p className="victory">Victory</p>
                        <button onClick={this.startGame}>
                            Play again
                        </button>
                    </div>
                     : null
                }

                <div className="board_game_wrap">
                    {this.state.tales.map((item, index) => (
                        <Tale key={index}
                              item={item}
                              cover={COVER}
                              handleClick={this.handleClick}
                              processing={this.state.isProcessing}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default BoardGame;
