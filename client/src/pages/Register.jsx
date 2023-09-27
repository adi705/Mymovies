import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import FormRow from '../components/FormRow';
import SubmitBtn from '../components/Submit';

export const action = async ({ request }) => {

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

   
    if( data.password != data.repassword){
       
        toast.error("passwords do not match, please try again");
        return redirect('/register')
    }

    try {
        await customFetch.post('/auth/register', data);
        
        toast.success('Registration successful');
        return redirect('/');
      } catch (error) {
        
        toast.error(error?.response?.data?.msg);
        return error;
      }
  };

const Register = () => {

  return (
   
     

      <Form method='post' className='form login-form'>
        
        <h4>Register</h4>
        <FormRow type='email' name='email'  placeholder="email" className="login-formrow" />
        <FormRow type='password' name='password'   placeholder="password"/>
        <FormRow type='password' name='repassword'   placeholder="Repeat password"/>
        <SubmitBtn />
        
        <p>
            Already have an account
            <Link to='/' className='member-btn'>
                Login
            </Link>
        </p>
    </Form>
   
  );
};
export default Register;
