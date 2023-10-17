import React from 'react'
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import {SubmitBtn} from '../components';
export const action = async ({request}) => {
  try {
    const formData = await request.formData();
    const newJob = Object.fromEntries(formData);
    
    await customFetch.post('/jobs', newJob);
    toast.success('Job Added');
    return redirect('/dashboard/all-jobs');
    
  } catch(error){
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AddJob = () => {
  const {user} = useOutletContext();
  
  return <Wrapper>
    <Form method="post" className='form'>
      <h4 className='form-title'>add job</h4>
      <div className='form-center'>
        <FormRow type='text' name='position' labelText='Position'/>
        <FormRow type='text' name='company' labelText='Company'/>
        <FormRow type='text' labelText='job location' name='jobLocation' defaultValue={user.location} />
        <FormRowSelect labelText='job status' name="jobStatus" defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
        <FormRowSelect labelText='job type' name="jobType" defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}/>
        <SubmitBtn formBtn/>
      </div>
    </Form>
  </Wrapper>
  
}

export default AddJob
