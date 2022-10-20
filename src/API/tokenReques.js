import md5 from 'crypto-js/md5';

const tokenRequest = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await request.json();
  return data;
};

export const hashEmail = (email) => md5(email).toString();

export const questRequest = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await request.json();
  return data;
};

export default tokenRequest;
