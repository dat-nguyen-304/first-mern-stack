import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RegisterForm () {
    return (
        <>
            <Form className='my-4'>
                <Form.Group className='my-4'>
                    <Form.Control type='text' placeholder='Username' name='username' required />
                </Form.Group>
                <Form.Group className='my-4'>
                    <Form.Control type='password' placeholder='Password' name='password' required />
                </Form.Group>
                <Form.Group className='my-4'>
                    <Form.Control type='password' placeholder='Confirm Password' name='confirmPassword' required />
                </Form.Group>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ms-2'>Login</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm;