import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Recaptcha from 'react-recaptcha';

export default function JoinDialog({ buttonText, job, buttonSize = '', buttonColor='' }) {
  const [open, setOpen] = React.useState(false);
  const [insurance, setInsurance] = React.useState('');
  const [linkedInUrl, setLinkedInUrl] = React.useState('');
  const [recaptcha, setRecaptcha] = React.useState('')
  const [validSubmitAttempted, setValidSubmitAttempted] = React.useState(false)
  const form = React.createRef();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setLinkedInUrl('');
    setRecaptcha('');
    setValidSubmitAttempted(false);
  }

  function handleSubmit() {
    if (form.current.reportValidity()) {
      setValidSubmitAttempted(true);

      if (recaptcha) {
        fetch('https://at8732o4l6.execute-api.us-east-1.amazonaws.com/Prod/apply', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.altostra+json;version=1.0'
          },
          cache: 'no-cache',
          body: JSON.stringify({
            url: linkedInUrl,
            job,
            insurance,
            captcha: recaptcha
          })
        })

        handleClose()
      }
    }
  }

  return (
    <div className="apply-to-job">
      <button className={`button ${buttonSize} ${buttonColor}`} onClick={handleClickOpen}>
      {buttonText}
      </button>

      <Dialog scroll="body" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join Us</DialogTitle>
        <DialogContent>
            <form autoComplete="on" ref={form} name="joinForm" action="#" id="join-form" className="join-form">
              <p className="screen-reader-text">
                <label>Don't fill this out if you're human: <input id="join-insurance" name="insurance-field" onChange={e => setInsurance(e.target.value)} value={insurance} /></label>
              </p>
              
              <p className="form-row">
                <label className="form-label">LinkedIn URL</label>
                <input
                  className="form-input"
                  name="linkedinurl"
                  type="url"
                  autoComplete="url"
                  required
                  autoFocus
                  onChange={e => setLinkedInUrl(e.target.value)}
                  value={linkedInUrl}
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
          <button className="button" onClick={handleSubmit}>APPLY</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}