import { getReadline } from '../loaders/readline-loader.js';

export function waitForDoubleEnter(onComplete) {
  const readlineInterface = getReadline();
  let noteContent = '';
  let emptyLineCounter = 0;

  const handleLine = typedLine => {
    if (typedLine.trim() === '') {
      emptyLineCounter += 1;
    } else {
      emptyLineCounter = 0;
    }

    if (emptyLineCounter >= 2) {
      readlineInterface.removeListener('line', handleLine);
      onComplete(noteContent);
    } else {
      noteContent += `${typedLine}\n`;
    }
  };

  readlineInterface.on('line', handleLine);
}
