import React from 'react'

const FormRow = ({type, id,name,labelText, defaultValue, onChange}) => {
  return (
    <div className="form-row">
        <label htmlFor={name} className='form-label'>
            {labelText}
        </label>
        <input 
            type={type} 
            id={id} 
            name={name} 
            className='form-input' 
            defaultValue={defaultValue || ''} 
            required onChange={onChange}></input>
     </div>
  )
}

export default FormRow
