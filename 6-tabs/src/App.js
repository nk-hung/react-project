import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    try {
      const response = await fetch(url);
      const newJobs = await response.json();
      setJobs(newJobs);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    fetchJobs();
  }, [])
  
  if (loading) {
    return <section className='section loading'>
      <h1>loading...</h1>
    </section>
  }
  const { title, dates, duties, company } = jobs[value];
  return (
    <main>
      <section className='section'>
        <div className='title'>
          <h3>Experience</h3>
          <div className="underline"></div>
        </div>
        <div className="container">
          {/* { btn container} */}
          <div className="btn-container">
            { jobs.map((job, index) => {
              return (
                <button key={job.id} className={`btn-job ${index === value && 'active-btn'}`} onClick={() => setValue(index)}>{job.company}</button>
              )
            })}
          </div>
          {/* { job info} */}
          <article className='job-info'>
            <h3 className='job-title'>{title}</h3>
            <h4>{company}</h4>
            <p className="job-date">{dates}</p>
            {
              duties.map((duty, index) => {
                return <div key={index} className='job-desc'>
                  <FaAngleDoubleRight className='job-icon' />
                  {duty}</div>
              })
            }
          </article>
        </div>
      </section>
    </main>
  )
}
export default App;