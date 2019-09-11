import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Recaptcha from 'react-recaptcha';
import EVENTS from '../analytics/events';

export default class JoinDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      insurance: '',
      name: '',
      company: '',
      jobTitle: '',
      email: '',
      open: false
    };

    this.form = React.createRef();
    this.recaptchaEl = React.createRef();
    this.analytics = null
  }

  componentDidMount() {
    this.analytics = require('../analytics')
  }

  sendAnalytics(...args) {
    if (this.analytics) {
      this.analytics.send(...args)
    }
  }

  handleClickOpen() {
    this.sendAnalytics(EVENTS.JOIN_BETA.OPEN);
    this.setState({ open: true });
  }

  handleSubmit() {
    this.sendAnalytics(EVENTS.JOIN_BETA.SUBMIT);
    if (this.form.current.reportValidity()) {
      this.recaptchaEl.current.execute();
    }
  }

  handleClose() {
    this.sendAnalytics(EVENTS.JOIN_BETA.CLOSE);
    this.setState({
      open: false,
      name: '',
      email: '',
      jobTitle: '',
      company: ''
    });
  }

  handleRecaptchaVerify(captcha) {
    this.sendAnalytics(EVENTS.JOIN_BETA.SEND);
    fetch('https://at8732o4l6.execute-api.us-east-1.amazonaws.com/Prod/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.altostra+json;version=1.0'
      },
      cache: 'no-cache',
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        company: this.state.company,
        jobTitle: this.state.jobTitle,
        insurance: this.state.insurance,
        captcha
      })
    })

    this.handleClose()
  }

  /**
   * Super hack to fix the masthead moving right when dialog opens
   * 
   * When the dialog opens it adds 17px of right padding to the body element and sets the overflow of
   * the body to hidden. This prevents the dialog from scrolling and pushes the body to the left to prevent
   * a "jump" of the whole content because the scrollbar disappreas. But, this does't apply on the #masthead
   * element since it's absolute. To overcome this, we hackily add a style to the #masthead element that pushes
   * it to the left when the dialog is entering and removes the style when it's exited. These specific events,
   * onEntering and onExited, are required for the hack to work properly and prevents the #masthead element
   * from jittering back and forth.
   * Only apply the hack when width > 800 as it's defined in the CSS. 800 and below collapses the header and
   * breaks the view if the hack is applied.
   */
  handleDialogEntering() {
    if (window.innerWidth > 800) {
      document.querySelector('#masthead').style.marginRight = "17px";
    }
  }
  handleDialogExited() {
    if (window.innerWidth > 800) {
      document.querySelector('#masthead').style.marginRight = "";
    }
  }
  // End of super hack

  render() {
    return (
      <div>
        <button className={`button ${this.props.buttonSize} ${this.props.buttonColor}`} onClick={this.handleClickOpen.bind(this)}>
        {this.props.buttonText}
        </button>
  
        <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} onEntering={this.handleDialogEntering.bind(this)} onExited={this.handleDialogExited.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Join</DialogTitle>
          <DialogContent>
            <form autoComplete="on" ref={this.form} name="joinForm" action="#" id="join-form" className="join-form">
              <p className="screen-reader-text">
                <label>Don't fill this out if you're human: <input id="join-insurance" name="insurance-field" onChange={e => this.setState({ insurance: e.target.value })} value={this.state.insurance} /></label>
              </p>
              
              <p className="form-row">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  autoComplete="name"
                  autoFocus
                  onChange={e => this.setState({ name: e.target.value })}
                  value={this.state.name}
                />
              </p>
  
              <p className="form-row">
                <label className="form-label">Job Title</label>
                <input
                  className="form-input"
                  name="job"
                  type="text"
                  placeholder="Job Title"
                  required
                  autoComplete="organization-title"
                  onChange={e => this.setState({ jobTitle: e.target.value })}
                  value={this.state.jobTitle}
                />
              </p>
  
              <p className="form-row">
                <label className="form-label">Company</label>
                <input
                  className="form-input"
                  name="company"
                  type="text"
                  placeholder="Company"
                  required
                  autoComplete="organization"
                  onChange={e => this.setState({ company: e.target.value })}
                  value={this.state.company}
                />
              </p>
              
              <p className="form-row">
                <label className="form-label">Email address</label>
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  autoComplete="email"
                  onChange={e => this.setState({ email: e.target.value })}
                  value={this.state.email}
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
            {/* <button className="button white secondary" onClick={handleClose}>Close</button> */}
            <button className="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}