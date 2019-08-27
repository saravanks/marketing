import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Recaptcha from 'react-recaptcha';

export default function JoinDialog({ buttonText, buttonSize = '', buttonColor='' }) {
  const [open, setOpen] = React.useState(false);
  const [insurance, setInsurance] = React.useState('');
  const [name, setName] = React.useState('');
  const [organization, setOrganization] = React.useState('');
  const [job, setJob] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [recaptcha, setRecaptcha] = React.useState('')
  const [validSubmitAttempted, setValidSubmitAttempted] = React.useState(false)
  const form = React.createRef();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setName('');
    setEmail('');
    setJob('');
    setOrganization('');
    setRecaptcha('');
    setValidSubmitAttempted(false);
  }

  function handleSubmit() {
    if (form.current.reportValidity()) {
      setValidSubmitAttempted(true);

      if (recaptcha) {
        fetch('https://at8732o4l6.execute-api.us-east-1.amazonaws.com/Prod/signup', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.altostra+json;version=1.0'
          },
          cache: 'no-cache',
          body: JSON.stringify({
            email,
            name,
            insurance,
            captcha: recaptcha
          })
        })

        handleClose()
      }
    }
  }

  return (
    <div>
      <button className={`button ${buttonSize} ${buttonColor}`} onClick={handleClickOpen}>
      {buttonText}
      </button>

      <Dialog scroll="body" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Join our awesome Beta!
          </DialogContentText> */}
            <form autoComplete="on" ref={form} name="joinForm" action="#" id="join-form" className="join-form">
              <p className="screen-reader-text">
                <label>Don't fill this out if you're human: <input id="join-insurance" name="insurance-field" onChange={e => setInsurance(e.target.value)} value={insurance} /></label>
              </p>
              
              <p className="form-row">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  autoFocus
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </p>

              <p className="form-row">
                <label className="form-label">Job Title</label>
                <input
                  className="form-input"
                  name="job"
                  type="text"
                  required
                  autoComplete="organization-title"
                  onChange={e => setJob(e.target.value)}
                  value={job}
                />
              </p>

              <p className="form-row">
                <label className="form-label">Company</label>
                <input
                  className="form-input"
                  name="company"
                  type="text"
                  required
                  autoComplete="organization"
                  onChange={e => setOrganization(e.target.value)}
                  value={organization}
                />
              </p>
              
              <p className="form-row">
                <label className="form-label">Email address</label>
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </p>

              <Recaptcha
                className={`recaptcha fix-height ${validSubmitAttempted && !recaptcha ? 'required' : ''}`}
                size="compact"
                sitekey="6LcpwrQUAAAAACiIUAogkhK9N0Es4_wZAh2J7CYE"
                verifyCallback={response => setRecaptcha(response)}
                expiredCallbacd={() => setRecaptcha('')}
              />
            </form>
        </DialogContent>
        <DialogActions>
          <button className="button white secondary" onClick={handleClose}>Close</button>
          <button className="button" onClick={handleSubmit}>Submit</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// import React from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// export default function FormDialog({ title, children, open, onSubmit, onCancel }) {
//   function handleCancel() {
//     onCancel()
//   }

//   function handleSubmit() {
//     onSubmit()
//   }

//   return (
//     <div>
//       <button className="button" onClick={() => this.setState({ dialogOpen: true})}>JOIN</button>
//       <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             {title}
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancel} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }