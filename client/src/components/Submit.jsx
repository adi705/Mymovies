import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type='submit'
      className={`btn btn-block ${formBtn && 'form-btn'} `}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting' : 'let\'s go!'}
    </button>
  );
};
export default SubmitBtn;