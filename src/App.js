import React, { useState, useEffect } from 'react';
import wordList from './resources/words.json';
import Word from './Word';

const MAX_TYPED_KEYS = 30;



const getWord = () => {
  const index = Math.floor(Math.random() * wordList.length)
  const word = wordList[index];
  return word.toLowerCase();
}

const isValidKey = (key, word) => {
  if (!word) return false;
  const result = word.split('').includes(key);
  return result;
}

const App = () => {

  useEffect(() => {
    setWord(getWord);
  }, []);

  const [validKeys, setValidKeys] = useState([]);
  const [typedKeys, setTypedKeys] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    const wordValidKeys = validKeys.join('').toLowerCase();
    if (word && word === wordValidKeys) {
      //Adicionar word a completedWords
      //limpar o array de verificação
      //buscar uma nova palavra

      let newWord = null;
      do {
        newWord = getWord();
      } while (completedWords.includes(newWord))

      setWord(newWord);
      setValidKeys([]);
      setCompletedWords((prev) => [...prev, word]);

    }
  }, [word, validKeys, completedWords]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    const { key } = e;
    setTypedKeys((prev) => [...prev, key].slice(-MAX_TYPED_KEYS));

    if (isValidKey(key, word)) {
      setValidKeys((prev) => {
        const isValidLength = prev.length <= word.length;
        const isNextChar = isValidLength && word[prev.length] === key;

        return isNextChar ? [...prev, key] : prev;
      })
    }

  }

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>
      <div className="valid-keys">
        <Word word={word} validKeys={validKeys} />
      </div>
      <div className="typed-keys">
        {typedKeys ? typedKeys.join(" ") : null}
      </div>
      <div className="completed-words">
        <ol>
          {completedWords.map((word) => {
            return (<li key={word}>{word}</li>)
          })}
        </ol>
      </div>
    </div>

  )
}

export default App;