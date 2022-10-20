import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { questRequest } from '../API/tokenReques';
import Header from '../component/Header';
import { saveScore } from '../actions';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      questions: '',
      index: 0,
      myQuest: '',
      correctAnswer: '',
      answerClick: false,
      classnameCorrect: 'green-border',
      classnameIncorrect: 'red-border',
      startCounter: 30,
      disableAnswers: false,
      score: 0,
      acertos: 0,
    };
  }

  async componentDidMount() {
    this.getTrivia();
    this.timer();
  }

  getTrivia = async () => {
    const { token } = this.props;
    const data = await questRequest(token);
    this.setState(
      {
        questions: data.results,
      },
      () => this.imprimeQuest(),
    );
  };

  imprimeQuest = () => {
    const { history } = this.props;
    const { questions, index } = this.state;
    const Numb = 5;
    if (index === Numb) {
      history.push('/feedbacks');
    }
    const primeiro = questions[index];
    this.setState(
      {
        myQuest: primeiro,
      },
      () => {
        const { myQuest } = this.state;
        this.setState(
          {
            correctAnswer: myQuest.correct_answer,
            allquestions: [
              ...myQuest.incorrect_answers,
              myQuest.correct_answer,
            ],
          },
          () => this.randomQuests(),
        );
      },
    );
  };

  randomQuests = () => {
    const { allquestions } = this.state;
    for (let indice = allquestions.length; indice; indice -= 1) {
      const indiceAleatorio = Math.floor(Math.random() * indice);
      // guarda de um índice aleatório da allquestions
      const elemento = allquestions[indice - 1];
      allquestions[indice - 1] = allquestions[indiceAleatorio];
      allquestions[indiceAleatorio] = elemento;
    }
    // esse for é um fisher-yats retirado deste site > http://cangaceirojavascript.com.br/como-embaralhar-arrays-algoritmo-fisher-yates/
    this.setState({ allquestions });
  };

  handleClick = () => {
    const { index } = this.state;
    this.setState(
      {
        disableAnswers: false,
        startCounter: 30,
        index: index + 1,
        answerClick: false,
      },
      () => this.imprimeQuest(),
    );
    this.timer();
  };

  handleAnswerClick = ({ target }) => {
    const { startCounter, myQuest: { difficulty } } = this.state;
    const ten = 10;
    const three = 3;
    this.setState({ answerClick: true });
    if (target.name === 'correct') {
      switch (difficulty) {
      case 'easy':
        this.setState((prev) => ({
          score: prev.score + startCounter + ten,
          acertos: prev.acertos + 1,
        }), () => this.scoreToRedux());
        break;
      case 'medium':
        this.setState((prev) => ({
          score: prev.score + (startCounter * 2) + ten,
          acertos: prev.acertos + 1,
        }), () => this.scoreToRedux());
        break;
      case 'hard':
        this.setState((prev) => ({
          score: prev.score + (startCounter * three) + ten,
          acertos: prev.acertos + 1,
        }), () => this.scoreToRedux());
        break;
      default:
        break;
      }
    }
  };

  scoreToRedux = () => {
    const { score, acertos } = this.state;
    const { changeScore } = this.props;
    const arrayScoreAcerto = [score, acertos];
    changeScore(arrayScoreAcerto);
  }

  clearInterval = (timer) => {
    const { startCounter, answerClick } = this.state;
    if (answerClick) {
      clearInterval(timer);
      this.setState({ disableAnswers: true });
    }
    if (startCounter === 0) {
      clearInterval(timer);
      this.setState({ disableAnswers: true, answerClick: true });
    }
  }

  timer = () => {
    const oneSecond = 1000;
    const timer = setInterval(() => {
      this.setState((prev) => ({
        startCounter: prev.startCounter - 1,
      }));
    }, oneSecond);
    setInterval(() => {
      this.clearInterval(timer);
    }, oneSecond);
  };

  render() {
    const {
      myQuest: { category, difficulty, question },
      allquestions,
      correctAnswer,
      answerClick,
      classnameCorrect,
      classnameIncorrect,
      startCounter,
      disableAnswers,
      score,
    } = this.state;
    return (
      <>
        <Header />
        <div className='d-md-flex justify-content-md-center'>
          <div className='card shadow-box transparent-window'>
            <div class="card-body">
              <div className='card-header'>
                Pergunta
              </div>
              <div className='card-body'>
              <h4 data-testid="question-text" className='card-title d-md-flex justify-content-md-center'>{question}</h4>
              <h5 data-testid="question-category" className='card-subtitle mb-2 d-md-flex justify-content-md-center'>{category}</h5>
              <h5 className='card-text d-md-flex justify-content-md-center'>difficulty: {difficulty}</h5>
              <div className='d-grid gap-2 d-md-flex justify-content-md-center'>
                {allquestions === undefined
                ? null
                : allquestions.map((a, index) => (
                  <div data-testid="answer-options" key={ a }>
                    {a === correctAnswer ? (
                      <button
                        type="button"
                        id={ index }
                        data-testid="correct-answer"
                        className={ answerClick ? "btn btn-success mb-3" : "btn btn-primary mb-3" }
                        onClick={ this.handleAnswerClick }
                        disabled={ disableAnswers }
                        name="correct"
                      >
                        {a}
                      </button>
                    ) : (
                      <button
                        type="button"
                        id={ index }
                        data-testid={ `wrong-answer-${index}` }
                        className={ answerClick ? "btn btn-danger mb-3" : "btn btn-primary mb-3" }
                        onClick={ this.handleAnswerClick }
                        disabled={ disableAnswers }
                        name="incorrect"
                      >
                        {a}
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className='counter d-md-flex justify-content-md-center'><strong>{startCounter}</strong></p>
              {answerClick ? (
                <div className='d-md-flex justify-content-md-end'>
                <input
                  type="button"
                  value="Proximo"
                  data-testid="btn-next"
                  className='btn btn-primary'
                  onClick={ this.handleClick }
                />
                </div>
              ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Trivia.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  changeScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  changeScore: (score) => dispatch(saveScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
