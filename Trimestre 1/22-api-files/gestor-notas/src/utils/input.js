import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export const ask = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
};

export const waitForDoubleEnter = () => {
  return new Promise((resolve) => {
    let content = '';
    let emptyLines = 0;

    const onLine = (line) => {
      if (line.trim() === '') {
        emptyLines++;
      } else {
        emptyLines = 0;
      }

      if (emptyLines === 2) {
        rl.off('line', onLine);
        resolve(content);
      } else {
        content += line + '\n';
      }
    };

    rl.on('line', onLine);
  });
};

export const close = () => {
  rl.close();
};
