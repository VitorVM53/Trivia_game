import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import { hashEmail } from '../API/tokenReques';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    this.getMessage();
    this.saveLocalStorage();
  }

  saveLocalStorage = () => {
    const { score, name, gravatarEMail } = this.props;
    const urlEmail = hashEmail(gravatarEMail);
    const objectToStorage = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${urlEmail}`,
    };
    if (localStorage.ranking) {
      const previous = localStorage.getItem('ranking');
      const toParse = JSON.parse(previous);
      for (let index = 0; index < toParse.length; index += 1) {
        if (toParse[index].name === objectToStorage.name
          || toParse[index].picutre === objectToStorage.picture
        ) {
          toParse[index] = objectToStorage;
        } else {
          const lero = [...toParse, objectToStorage];
          const lerolero = JSON.stringify(lero);
          console.log(previous, toParse);
          return localStorage.setItem('ranking', lerolero);
        }
      }
    }
    const objectToStorageString = JSON.stringify([objectToStorage]);
    localStorage.setItem('ranking', objectToStorageString);
  }

  getMessage = () => {
    const { acertos } = this.props;
    console.log(acertos);
    const three = 3;
    if (acertos >= three) {
      this.setState({
        message: 'Well Done!',
      });
    } else {
      this.setState({
        message: 'Could be better...',
      });
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { message } = this.state;
    const { score, acertos } = this.props;
    console.log(message);
    return (
      <>
        <Header />
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-center'>
          <figure className='text-center bd-example transparent-window box-form'>
            <h1 data-testid="feedback-text" className='mb-4'>{message}</h1>
            <figcaption className='mb-4'>
              <h1 data-testid="feedback-total-score"> Seus Pontos: {score}</h1>
              <h1 data-testid="feedback-total-question">Seus Acertos: {acertos}</h1>
            </figcaption>
          </figure>
        </div>
        <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
          <button
            type="button"
            className='btn btn-primary'
            onClick={ this.handleClickRanking }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
          <button
            type="button"
            className='btn btn-primary'
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Jogar de novo
          </button>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  acertos: PropTypes.number.isRequired,
  gravatarEMail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  acertos: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEMail: state.player.gravatarEMail,
});

export default connect(mapStateToProps)(Feedback);

// export function getShoppingCartItems() {
//  return localStorage.shoppingCart ? JSON.parse(localStorage.shoppingCart) : {};
// <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-center'>
//          <div className="bd-example transparent-window"></div>
// }
