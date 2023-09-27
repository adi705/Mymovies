import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import FormRow from '../components/FormRow';
import SubmitBtn from '../components/Submit';

export const action = async ({ request }) => {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/login', data);
        
        toast.success('Login successful');
        return redirect('/home');
      } catch (error) {
        
        toast.error(error?.response?.data?.msg);
        return error;
      }
  };

const Login = () => {

  return (
   
     

      <Form method='post' className='form login-form'>
        
        <h4>login</h4>
        <FormRow type='email' name='email'  placeholder="email" className="login-formrow" />
        <FormRow type='password' name='password'   placeholder="password"/>
        <SubmitBtn />
        
        <p>
            Don't have an account? 
            <Link to='/register' className='member-btn'>
                Register
            </Link>
        </p>
    </Form>
   
  );
};
export default Login;
