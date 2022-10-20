import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRankingLocalStorage();
  }

  getRankingLocalStorage = () => {
    const rankingStorage = localStorage.getItem('ranking');
    const rankingStorageParse = JSON.parse(rankingStorage);
    console.log(rankingStorageParse);
    const rankingSort = rankingStorageParse.sort((a, b) => b.score - a.score);
    this.setState({ ranking: rankingSort });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
    <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-center'>
      <div className='bd-example shadow-box box-form'>
        <h2 data-testid="ranking-title" className='text-center'> Ranking</h2>
        <table className='table'>
          <thead>
            <tr>
              <th scope="col">Posição</th>
              <th scope="col">Nome</th>
              <th scope="col">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((player, index) => (
              <tr
                className=''
                key={ player.name }
              >
                <th scope="row">#{index}</th>
                <td data-testid={ `player-name-${index}` }>{player.name}</td>
                <td data-testeid={ `player-score-${index}` }>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
          <button
            type="button"
            data-testid="btn-go-home"
            className='btn btn-primary'
            onClick={ this.handleClick }
          >
            Tela Inicial
          </button>

        </div>
      </div>
    </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};

export default Ranking;
