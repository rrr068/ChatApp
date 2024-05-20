import { password } from 'bun';

const generateSalt = (rounds: number = 16): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < rounds) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const hashPassword = async (pw: string): Promise<{salt: string, hashedPassword: string}> => {
  // passwordをhash化する関数
  const salt = generateSalt(32);
  const hashedPassword = await password.hash(`${pw}${salt}`);
  return { hashedPassword, salt };
};
