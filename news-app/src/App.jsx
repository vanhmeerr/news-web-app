import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Import React and necessary packages from 'react-router-dom' for routing

import Homepage from './components/Homepage'
// Import the Homepage component to display on the '/home' route

import AOS from 'aos';
import 'aos/dist/aos.css';
// Import AOS (Animate On Scroll) for adding scroll-based animations, and its CSS for styling the animations

AOS.init({
    duration: 3000
});
// Initialize AOS with a 3-second duration for animations to occur

function App() {
    return (
        <Router>
            {/* Router wraps the app, enabling routing across different components */}
            <Routes>
                {/* Routes defines different paths (URLs) that render different components */}
                <Route path='/home' element={<Homepage />}>
                    {/* This route renders the Homepage component when the path is '/home' */}
                </Route>
            </Routes>
        </Router>
    )
}

export default App
// Export the App component so it can be used in other parts of the project
