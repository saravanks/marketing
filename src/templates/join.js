import React from 'react';
import _ from 'lodash';

import Recaptcha from 'react-recaptcha'
import {Layout} from '../components/index';
import {htmlToReact, safePrefix} from '../utils';

export default class Join extends React.Component {
    constructor() {
        super()
        this.state = {
            recaptchaVerified: false
        }
    }

    render() {
        return (
            <Layout {...this.props}>
            <div className="outer">
              <div className="inner-medium">
                <article className="post page post-full">
                  <header className="post-header">
                    <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                  </header>
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                  </div>
                  }
                  {_.get(this.props, 'pageContext.frontmatter.img_path') && 
                  <div className="post-thumbnail">
                    <img src={safePrefix(_.get(this.props, 'pageContext.frontmatter.img_path'))} alt={_.get(this.props, 'pageContext.frontmatter.title')} />
                  </div>
                  }
                  <div className="post-content">
                    {htmlToReact(_.get(this.props, 'pageContext.html'))}
                    <form name="joinForm" method="POST" netlify-honeypot="bot-field" data-netlify="true" id="join-form" className="join-form">
                      <p className="screen-reader-text">
                        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                      </p>
                      
                      <p className="form-row">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" className="form-input"/>
                      </p>
                      
                      <p className="form-row">
                        <label className="form-label">Email address</label>
                        <input type="email" name="email" className="form-input"/>
                      </p>

                      <Recaptcha 
                        verifyCallback={() => this.recaptchaVerified = true}
                        sitekey='6LcpwrQUAAAAACiIUAogkhK9N0Es4_wZAh2J7CYE' />
                      <br/>
                      
                      <p className="form-row form-submit">
                        <button type="submit" className="button" disabled={!this.recaptchaVerified}>JOIN</button>
                      </p>
                    </form>
                  </div>
                </article>
              </div>
            </div>
            </Layout>
        );
    }
}
