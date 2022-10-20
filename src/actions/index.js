export const USER_LOGIN = 'USER_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const CHANGE_SCORE = 'CHANGE_SCORE';

export const minhaAction = () => ({
  type: USER_LOGIN,
});

export const saveToken = (user) => ({
  type: SAVE_TOKEN,
  token: user[0],
  name: user[1],
  email: user[2],
  score: user[3],
});

export const saveScore = (array) => ({
  type: CHANGE_SCORE,
  score: array[0],
  assertions: array[1],
});

export default minhaAction;
