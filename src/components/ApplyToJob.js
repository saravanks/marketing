import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Recaptcha from 'react-recaptcha';

export default class JoinDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      insurance: '',
      linkedInUrl: '',
      open: false
    };

    this.form = React.createRef();
    this.recaptchaEl = React.createRef();
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleSubmit() {
    if (this.form.current.reportValidity()) {
      this.recaptchaEl.current.execute();
    }
  }

  handleClose() {
    this.setState({
      open: false,
      linkedInUrl: ''
    })
  }

  handleRecaptchaVerify(captcha) {
    fetch('https://at8732o4l6.execute-api.us-east-1.amazonaws.com/Prod/apply', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.altostra+json;version=1.0'
      },
      cache: 'no-cache',
      body: JSON.stringify({
        url: this.state.linkedInUrl,
        job: this.props.job,
        insurance: this.state.insurance,
        captcha
      })
    })

    this.handleClose()
  }

  render() {
    return (
      <div className="apply-to-job">
        <button className={`button ${this.props.buttonSize} ${this.props.buttonColor}`} onClick={this.handleClickOpen.bind(this)}>
        {this.props.buttonText}
        </button>
  
        <Dialog scroll="body" open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Join Us</DialogTitle>
          <DialogContent>
              <form autoComplete="on" ref={this.form} name="joinForm" action="#" id="join-form" className="join-form">
                <p className="screen-reader-text">
                  <label>Don't fill this out if you're human: <input id="join-insurance" name="insurance-field" onChange={e => this.setState({ insurance: e.target.value })} value={this.state.insurance} /></label>
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
                    onChange={e => this.setState({ linkedInUrl: e.target.value })}
                    value={this.state.linkedInUrl}
                  />
                </p>
  
                <Recaptcha
                  className="recaptcha fix-height"
                  size="invisible"
                  sitekey="6LdborcUAAAAAMf5FWf4aRv-UcUGWmaIU29Abf1u"
                  verifyCallback={this.handleRecaptchaVerify.bind(this)}
                  ref={this.recaptchaEl}
                />
              </form>
          </DialogContent>
          <DialogActions>
            <button className="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}