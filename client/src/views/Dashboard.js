import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { Spinner, Card, Button, Row, Col, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap';
import SinglePost from "../components/SinglePost";
import AddPostModal from "../components/AddPostModal";
import UpdatePostModal from "../components/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
    //Context
    const { authState: { user: { username } } } = useContext(AuthContext);

    let { postState: { post, posts, postsLoading },
        getPosts,
        setShowAddPostModal,
        showToast,
        setShowToast
    } = useContext(PostContext);
    const { show, message, type } = showToast;
    //Start: get all posts
    useEffect(() => {
        getPosts();
    }, []);

    let body = null;

    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi { username }</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your first skill to learn
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={ () => setShowAddPostModal(true) }
                        >
                            LearnIt
                        </Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {

        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-2">
                    { posts.map((post) => (
                        <Col key={ post._id } className="my-2">
                            <SinglePost post={ post } />
                        </Col>
                    )) }
                </Row>
                <OverlayTrigger placement="left" overlay={ <Tooltip>Add a new thing to learn</Tooltip> }>
                    <Button className='btn-floating' onClick={ () => setShowAddPostModal(true) }>
                        <img src={ addIcon } alt="add-post" width="60" height="60" />
                    </Button>
                </OverlayTrigger>

            </>
        )
    }

    return (
        <>
            { body }
            <AddPostModal />
            { post && <UpdatePostModal /> }
            <Toast
                show={ show }
                style={ { position: 'fixed', bottom: '20%', right: '10px' } }
                className={ `bg-${type} text-white` }
                onClose={ setShowToast.bind(this, { show: false, message: '', type: null }) }
                delay={ 3000 }
                autohide
            >
                <Toast.Body>
                    <strong>{ message }</strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default Dashboard;