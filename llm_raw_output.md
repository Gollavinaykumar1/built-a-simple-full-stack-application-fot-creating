# LLM Output

### FILE: src/App.jsx
```jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';
import { Calendar } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const App = () => {
  const [timeTables, setTimeTables] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const fetchTimeTables = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/time-tables`);
      setTimeTables(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const createTimeTable = useCallback(async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/time-tables`, data);
      setTimeTables([...timeTables, response.data]);
      setCreating(false);
      reset();
    } catch (error) {
      console.error(error);
    }
  }, [timeTables, creating]);

  const editTimeTable = useCallback(async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/time-tables/${editing.id}`, data);
      const updatedTimeTables = timeTables.map((timeTable) => timeTable.id === editing.id ? response.data : timeTable);
      setTimeTables(updatedTimeTables);
      setEditing(null);
      reset();
    } catch (error) {
      console.error(error);
    }
  }, [timeTables, editing]);

  const deleteTimeTable = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}/time-tables/${id}`);
      const updatedTimeTables = timeTables.filter((timeTable) => timeTable.id !== id);
      setTimeTables(updatedTimeTables);
    } catch (error) {
      console.error(error);
    }
  }, [timeTables]);

  useEffect(() => {
    fetchTimeTables();
  }, [fetchTimeTables]);

  const handleCreate = (data) => {
    createTimeTable(data);
  };

  const handleEdit = (data) => {
    editTimeTable(data);
  };

  const handleDelete = (id) => {
    deleteTimeTable(id);
  };

  return (
    <HashRouter>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Time Table App</h1>
        <div className="flex justify-between mb-4">
          <button
            className={clsx("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", creating ? "opacity-50 cursor-not-allowed" : "")}
            onClick={() => setCreating(true)}
            disabled={creating}
          >
            Create Time Table
          </button>
          <Link to="/time-tables" className="text-blue-500 hover:text-blue-700">View Time Tables</Link>
        </div>
        <Routes>
          <Route path="/" element={
            <div>
              {creating && (
                <form onSubmit={handleSubmit(handleCreate)} className="mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      {...register("description")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      {...register("startDate")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      {...register("endDate")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create</button>
                </form>
              )}
              {editing && (
                <form onSubmit={handleSubmit(handleEdit)} className="mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { value: editing.name })}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      {...register("description", { value: editing.description })}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      {...register("startDate", { value: editing.startDate })}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      {...register("endDate", { value: editing.endDate })}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
                </form>
              )}
            </div>
          } />
          <Route path="/time-tables" element={
            <div>
              <h2 className="text-2xl font-bold mb-4">Time Tables</h2>
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timeTables.map((timeTable) => (
                    <tr key={timeTable.id}>
                      <td className="px-4 py-2">{timeTable.name}</td>
                      <td className="px-4 py-2">{timeTable.description}</td>
                      <td className="px-4 py-2">{format(new Date(timeTable.startDate), 'yyyy-MM-dd')}</td>
                      <td className="px-4 py-2">{format(new Date(timeTable.endDate), 'yyyy-MM-dd')}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                          onClick={() => setEditing(timeTable)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleDelete(timeTable.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          } />
        </Routes>
      </div>
      <ToastContainer />
    </HashRouter>
  );
};

export default App;
=== END ===

### FILE: src/main.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
=== END ===

### FILE: src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-gray-100;
}

.container {
  @apply max-w-md mx-auto;
}
=== END ===

### FILE: src/api.js
```javascript
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const getTimeTables = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/time-tables`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createTimeTable = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/time-tables`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const editTimeTable = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/time-tables/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTimeTable = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/time-tables/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export { getTimeTables, createTimeTable, editTimeTable, deleteTimeTable };
=== END ===
```