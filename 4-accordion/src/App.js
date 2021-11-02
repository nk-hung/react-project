import React, { useState } from 'react';
import questions from './data';
import data from './data';
import SingleQuestion from './Question';

import './style.css';

function App() {
  const [questions, setQuestions] = useState(data);
  return (
    <main>
      <section className="container">
        <h2>Questions And Answers About Login</h2>
        <div className="info">
          { questions.map((question) => {
            return <SingleQuestion key={question.id} {...question} />
          })}        
        </div>
      </section>
    </main>
  )
}

export default App;
