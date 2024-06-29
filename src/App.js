
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudents from './AddStudents';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AddStudents />} />
            </Routes>
        </Router>
    );
}

export default App;
