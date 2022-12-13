import { Modal, Button, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../contexts/PostContext';

const UpdatePostModal = () => {
    //Context
    const { postState: { post }, showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast } = useContext(PostContext);

    //State
    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => {
        setUpdatedPost(post);
    }, [post]);

    const { title, description, url, status } = updatedPost;

    const onChangeUpdatePostForm = event => {
        setUpdatedPost({
            ...updatedPost,
            [event.target.name]: event.target.value
        })
    }

    const closeDialog = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    }

    const onSubmit = async event => {
        event.preventDefault();
        const { success, message } = await updatePost(updatedPost);
        closeDialog();
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    }

    return (
        <Modal show={ showUpdatePostModal } onHide={ closeDialog }>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={ onSubmit }>
                <Modal.Body>
                    <Form.Group className='my-4'>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            value={ title }
                            onChange={ onChangeUpdatePostForm }
                        />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control
                            as="textarea"
                            rows={ 3 }
                            placeholder="Description"
                            name="description"
                            value={ description }
                            onChange={ onChangeUpdatePostForm }
                        />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control
                            placeholder="Youtube tutorial"
                            name="url"
                            value={ url }
                            onChange={ onChangeUpdatePostForm }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="select" value={ status } name="status" onChange={ onChangeUpdatePostForm }>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ closeDialog }>Cancel</Button>
                    <Button variant="primary" type="submit">LearnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal;