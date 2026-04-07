import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    discription: '',
    email: ''
  })
  const [statusMsg, setStatusMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Submitting...');
    try {
      const response = await fetch('https://demodb-sample.onrender.com/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setStatusMsg('Details submitted successfully!');
        setFormData({ name: '', discription: '', email: '' });
      } else {
        setStatusMsg(data.error || 'Failed to submit details');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Error connecting to the server');
    }
  }

  return (
    <>
      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <div id="form">
            <form onSubmit={handleSubmit}>
              <input id="name" type="text" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
              <input id="discription" type="text" placeholder="Enter description" value={formData.discription} onChange={handleChange} required />
              <input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
              <button id="submit" type="submit">Submit</button>
              <button id="reset" type="reset" onClick={() => setFormData({ name: '', discription: '', email: '' })}>Reset</button>
            </form>
            {statusMsg && <p style={{ color: 'white', marginTop: '10px' }}>{statusMsg}</p>}
          </div> 
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
