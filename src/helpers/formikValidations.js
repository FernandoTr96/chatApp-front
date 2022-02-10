/* REGISTER SCREEN */
export const registerFormValidation = (values)=>{
    
    const errors = {};

    if(!values.username)
    {
      errors.username = 'username is required';
    }
    else if(values.username.length < 5)
    {
      errors.username = 'the username is very short, 5 characters minimum'
    }
    else if(values.username.length >= 40)
    {
      errors.username = 'the username is very long, 40 characters maximum'
    }

    if (!values.email)
    {
        errors.email = 'email is required';
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) 
    {
        errors.email = 'invalid email address';
    }

    if (!values.password)
    {
        errors.password = 'password is required';
    } 
    else if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i.test(values.password)) 
    {
        errors.password = 'the password must be between 8 and 16 characters long, with at least one digit, at least one lowercase letter, and at least one uppercase letter. It may have other symbols.';
    }

    if (!values.confirmPassword)
    {
        errors.confirmPassword = 'confirmPassword is required';
    }
    else if(values.password !== values.confirmPassword)
    {
        errors.confirmPassword = 'passwords do not match'
    }

    return errors

};

/* UPDATE PROFILE */
export const updateProfileFormValidation = (values)=>{
    
    const errors = {};

    if(!values.username)
    {
      errors.username = 'username is required';
    }
    else if(values.username.length < 5)
    {
      errors.username = 'the username is very short, 5 characters minimum'
    }
    else if(values.username.length >= 40)
    {
      errors.username = 'the username is very long, 40 characters maximum'
    }

    if (!values.email)
    {
        errors.email = 'email is required';
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) 
    {
        errors.email = 'invalid email address';
    }

    return errors

};