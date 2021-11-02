import React, { useState } from 'react';

import Review from './Review';
import {FaGithubSquare} from 'react-icons/fa';
function App() {
  return (
    <main>
      <section className="container">
        <div className="title">
          <h2>Ours Reviews</h2>
          <div className="underline"></div>
        </div>
        <Review />
      </section>
    </main>
  )
}

export default App;
