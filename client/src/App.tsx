import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [samples, setSamples] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingSample, setEditingSample] = useState<any>(null);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/samples');
      setSamples(response.data);
    } catch (error) {
      console.error(`Error fetching samples: ${error}`);
    }
  };

  const createSample = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/add_sample', { name, description });
      setSamples(prevSamples => [...prevSamples, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error(`Error creating sample: ${error}`);
    }
  };

  const updateSample = async (e: any) => {
    e.preventDefault();
    if (!editingSample) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/update_sample/${editingSample._id}`, { name, description });
      setSamples(samples.map(sample => (sample._id === editingSample._id ? response.data : sample)));
      setName('');
      setDescription('');
      setEditingSample(null);
    } catch (error) {
      console.error(`Error updating sample: ${error}`);
    }
  };

  const deleteSample = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sample?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/api/delete_sample/${id}`);
      setSamples(samples.filter(sample => sample._id !== id));
    } catch (error) {
      console.error(`Error deleting sample: ${error}`);
    }
  };

  const handleEdit = (sample: any) => {
    setEditingSample(sample);
    setName(sample.name);
    setDescription(sample.description);
  };

  return (
    <div>
      <h1>Sample Data: `localhost:27017`</h1>
      <form onSubmit={editingSample ? updateSample : createSample}>
        <input 
          type="text" 
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{editingSample ? 'Update Sample' : 'Add Sample'}</button>
      </form>
      <ul>
        {samples.map((sample) => (
          <li key={sample._id}>
            <h2>{sample.name}</h2>
            <p>{sample.description}</p>
            <button className='p-4 border border-black m-2' onClick={() => handleEdit(sample)}>Edit</button>
            <button className='p-4 border border-black m-2' onClick={() => deleteSample(sample._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
