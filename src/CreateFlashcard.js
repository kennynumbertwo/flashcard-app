import React, { useState } from 'react';
import useInputState from './hooks/useInputState';

function CreateFlashcard() {
  const [newFlashcard, setNewFlashcard] = useState([]);

  const handleClick = () => {
    setNewFlashcard([...newFlashcard, { question: newQuestion, answer: newAnswer }]);
    resetNewQuestion();
    resetNewAnswer();
  };

  const [newQuestion, updateNewQuestion, resetNewQuestion] = useInputState('');
  const [newAnswer, updateNewAnswer, resetNewAnswer] = useInputState('');

  return (
    <div>
      <h3>Add a new flashcard</h3>
      <div>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={updateNewQuestion}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newAnswer}
          onChange={updateNewAnswer}
        />
        <button type="button" onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}

export default CreateFlashcard;
