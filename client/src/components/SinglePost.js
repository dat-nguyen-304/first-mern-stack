import { Card, Row, Col, Badge } from 'react-bootstrap';
import ActionButtons from './ActionButtons';

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    const color = status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger';
    return (
        <Card className='shadow' border={ color }>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className='post-title'>{ title }</p>
                            <Badge pill bg={ color }>{ status }</Badge>
                        </Col>
                        <Col className='text-end'>
                            <ActionButtons url={ url } _id={ _id }></ActionButtons>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{ description }</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SinglePost;