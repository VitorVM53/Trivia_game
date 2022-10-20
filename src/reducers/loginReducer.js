import { SAVE_TOKEN, CHANGE_SCORE } from '../actions';

const INITAL_STATE = {
  player: {
    name: 'nome-da-pessoa',
    assertions: 0,
    score: 0,
    gravatarEmail: 'email-da-pessoa',
  },
  token: '',
  ranking: [
    { name: 'nome-da-pessoa', score: 10, picture: 'url-da-foto-no-gravatar' },
  ],
};

const reducerLogin = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.token,
      player: {
        name: action.name,
        assertions: state.player.assertions,
        gravatarEmail: action.email,
        score: action.score,
      },
    };
  case CHANGE_SCORE:
    return {
      ...state,
      player: {
        name: state.player.name,
        assertions: action.assertions,
        gravatarEmail: state.player.gravatarEmail,
        score: action.score,
      },
    };
  default:
    return state;
  }
};

export default reducerLogin;
