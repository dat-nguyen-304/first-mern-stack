import { Modal, Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { PostContext } from '../contexts/PostContext';

const AddPostModal = () => {
    //Context
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext);

    //State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    });

    const { title, description, url } = newPost;

    const onChangeNewPostForm = event => {
        setNewPost({
            ...newPost,
            [event.target.name]: event.target.value
        })
    }

    const closeDialog = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        });
        setShowAddPostModal(false);
    }

    const onSubmit = async event => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        closeDialog();
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    }

    return (
        <Modal show={ showAddPostModal } onHide={ closeDialog }>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
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
                            onChange={ onChangeNewPostForm }
                        />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control
                            as="textarea"
                            rows={ 3 }
                            placeholder="Description"
                            name="description"
                            value={ description }
                            onChange={ onChangeNewPostForm }
                        />
                    </Form.Group>
                    <Form.Group className='my-4'>
                        <Form.Control
                            placeholder="Youtube tutorial"
                            name="url"
                            value={ url }
                            onChange={ onChangeNewPostForm }
                        />
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

export default AddPostModal;