import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ArticleCard from './ArticleCard'

// News API key and base URL for fetching news data
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://newsapi.org/v2'


function Homepage() {
    // State to store articles, category, search keyword, sources, date filters, and loading status
    const [articles, setArticles] = useState([])
    const [category, setCategory] = useState('general')
    const [keyword, setKeyword] = useState('')
    const [sources, setSources] = useState([])
    const [selectedSource, setSelectedSource] = useState([])
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [loading, setLoading] = useState(true)

    // Fetch available news sources for filtering
    const fetchSources = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/sources`, {
                // Sending the required parameters to fetch news sources
                params: {
                    apiKey: API_KEY,
                    category,
                    language: 'en',
                    country: 'us'
                }
            })

            setSources(response.data.sources) // Storing the fetched sources in the state
        } catch (error) {
            console.log('ERROR FETCHING NEWS SOURCES:', error)
        }
    }

    // Fetch news articles based on current filters
    const fetchArticles = async () => {
        setLoading(true) // Set loading state to true when fetching data
        try {
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                // Sending parameters to fetch news based on filters (category, keyword, date)
                params: {
                    country: 'us',
                    category,
                    q: keyword,
                    from: fromDate,
                    to: toDate,
                    apiKey: API_KEY
                }
            })
            console.log('API RESPONSE:', response.data)
            setArticles(response.data.articles) // Storing fetched articles in the state
        } catch (error) {
            console.log('ERROR FETCHING NEWS ARTICLES:', error)
        }
        setLoading(false) // Set loading state to false once fetching is complete
    }

    useEffect(() => {
        fetchArticles() // Fetch articles when the component is loaded
        fetchSources() // Fetch sources when the component is loaded
    }, [category, keyword]) // Run when category or keyword changes


    return (
        <Container>
            {/* Page title */}
            <h1 className="my-4 text-center text-uppercase mb-6 display-1">News</h1>

            {/* Filter Section */}
            <Form className="mb-4">
                <Row className="g-3">
                    {/* Category dropdown for selecting news category */}
                    <Col md={6}>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} // Update selected category
                            >
                                {/* Dropdown options for categories */}
                                <option value="general">General</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                                <option value="health">Health</option>
                                <option value="science">Science</option>
                                <option value="sports">Sports</option>
                                <option value="entertainment">Entertainment</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    {/* Keyword search input for searching news articles by keyword */}
                    <Col md={6}>
                        <Form.Group controlId="keyword">
                            <Form.Label>Search</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter keyword"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)} // Update search keyword
                            />
                        </Form.Group>
                    </Col>

                    {/* News source dropdown for selecting specific source */}
                    <Col md={6}>
                        <Form.Group controlId="source">
                            <Form.Label>Source</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedSource}
                                onChange={(e) => setSelectedSource(e.target.value)} // Update selected source
                            >
                                <option value="">All Sources</option>
                                {/* Dynamically add available sources from the API */}
                                {sources.map((source) => (
                                    <option key={source.id} value={source.id}>
                                        {source.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    {/* Date filter for selecting 'From Date' */}
                    <Col md={3}>
                        <Form.Group controlId="fromDate">
                            <Form.Label>From Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)} // Update the 'from' date filter
                            />
                        </Form.Group>
                    </Col>

                    {/* Date filter for selecting 'To Date' */}
                    <Col md={3}>
                        <Form.Group controlId="toDate">
                            <Form.Label>To Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)} // Update the 'to' date filter
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {/* Search button to trigger article fetch based on filters */}
                <Button variant="dark" className="mt-3 btn-custom" onClick={fetchArticles}>
                    Search
                </Button>
            </Form>

            {/* Article Grid */}
            <Row>
                {/* Show loading text while articles are being fetched */}
                {loading ? (
                    <h2>Loading...</h2>
                ) : (
                    // Display articles in a grid layout
                    articles.map((article, index) => (
                        <Col key={index} md={4} className="mb-4">
                            {/* ArticleCard component to display each article */}
                            <ArticleCard article={article} />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    )
}

export default Homepage
