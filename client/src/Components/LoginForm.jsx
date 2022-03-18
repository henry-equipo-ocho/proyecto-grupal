import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';

export default function FormDialog({close}) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState({
       Email: "",
       Password: "",
   })


   const handleClickOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };

   const handleSubmit = (e) => {
     e.preventDefault()
   }
   const handleInputChange = (e) => {
       setInput({
           ...input,
           [e.target.name]: e.target.value
       })
   }
  

   return (
     <div>
         <DialogTitle>Iniciar Sesión</DialogTitle>
         <DialogContent>
           <TextField
             autoFocus
             name='Email'
             onChange={(e) => handleInputChange(e)}
             value={input.email}
             margin="dense"
             id="Email"
             label="Email Address"
             type="email"
             fullWidth
             variant="standard"
           />

         <TextField
             autoFocus
             onChange={(e) => handleInputChange(e)}
             name='Password'
             margin="dense"
             id="password"
             label="password"
             type="password"
             fullWidth
             variant="standard"
           />
         </DialogContent>
         <DialogContentText>
             <Button>
                 Olvidaste tu Contraseña
             </Button>
         </DialogContentText>
         <DialogActions>
           <Button 
           onClick={close}
           variant="outlined"
           >Cancel</Button>

           <Button 
           onClick={(e) => handleSubmit(e)}
           variant="outlined"
           >Iniciar Sesión</Button>
         </DialogActions>

         <DialogContentText>
         ¿No tienes cuenta?
             <Button href='/register'>
                  Registrese aquí
             </Button>
         </DialogContentText>
     </div>
   );
 } 

/*
       <Button variant="outlined" onClick={handleClickOpen}>
         Open form dialog
       </Button>

*/

/* 
const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const FormDialog = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <DialogTitle>Iniciar Sesión</DialogTitle>
        <DialogContent>

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="standard"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          variant="standard"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        </DialogContent>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default FormDialog; */
