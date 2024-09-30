import React from 'react';
import { Card, Button } from 'react-bootstrap';

// Component to display individual news articles in a card format
function ArticleCard({ article }) {
    return (
        // Bootstrap Card component to style each news article card
        <Card className='h-100' data-aos='fade-up' id='card-custom'>

            {/* Display article image; use a placeholder if the image is not available */}
            <Card.Img
                variant="top"
                src={article.urlToImage || 'https://via.placeholder.com/300x150'}
                alt='{article.title}'
                className='article-img' />

            <Card.Body>
                {/* Display the article title */}
                <Card.Title>{article.title}</Card.Title>

                {/* Display the article description */}
                <Card.Text>{article.description}</Card.Text>

                {/* Button to link to the full article; opens in a new tab */}
                <Button variant="dark" href={article.url} target="_blank" className='btn-custom'>
                    Read More
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ArticleCard;