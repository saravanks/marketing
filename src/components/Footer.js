import React from 'react';
import _ from 'lodash';

import {Link, safePrefix, htmlToReact} from '../utils';
import Social from './Social';
import SubscribeForm from './SubscribeForm';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" className="site-footer">
              <div className="wave-footer" aria-hidden="true">
                <svg viewBox="0 0 2060 137" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fillRule="evenodd">
                    <path className="path1" d="M0 0c393.11 119.844 807.532 100.397 1131.565 45.246C1397.404 0 1603.94-26.618 2060 49.769v51.317C909.022-58.747 1032.495 251.14 0 87.94V0z" fill="#E5E6FF">
                    </path><path className="path2" d="M0 0h2060v63.824C1026.921-96.01 1177.132 224.25 0 50.822V0z" fill="#F7F9FB"></path>
                  </g>
                </svg>
              </div>
              <div className="footer-top outer">
                <div className="inner">
                  <div className="footer-widgets">
                    <div className="widget footer-branding">
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.logo_img') ? 
                      <p className="site-logo">
                        <Link to={safePrefix('/')}><img src={safePrefix(_.get(this.props, 'pageContext.site.siteMetadata.footer.logo_img'))} alt="Logo" /></Link>
                      </p>
                       : 
                      <p className="site-title">
                        <Link to={safePrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title')}</Link>
                      </p>
                      }
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.tagline') && 
                      <p className="site-description">
                        {_.get(this.props, 'pageContext.site.siteMetadata.footer.tagline')}
                      </p>
                      }
                    </div>
                    {((_.get(this.props, 'pageContext.menus.secondary') && _.get(this.props, 'pageContext.site.siteMetadata.footer.has_nav')) || _.get(this.props, 'pageContext.site.siteMetadata.footer.has_social')) && 
                    <nav className="widget footer-navigation">
                      <div className="footer-nav-inside">
                        {(_.get(this.props, 'pageContext.menus.secondary') && _.get(this.props, 'pageContext.site.siteMetadata.footer.has_nav')) && 
                        <div className="secondary-nav">
                          <h2 className="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.nav_title')}</h2>
                          <ul className="secondary-menu">
                            {_.map(_.get(this.props, 'pageContext.menus.secondary'), (item, item_idx) => (
                            <li key={item_idx}>
                              <Link to={safePrefix(_.get(item, 'url'))}>{_.get(item, 'title')}</Link>
                            </li>
                            ))}
                          </ul>
                        </div>
                        }
                        {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_social') && 
                        <div className="social-nav">
                          <h2 className="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.social_title')}</h2>
                          <Social {...this.props} />
                        </div>
                        }
                      </div>
                    </nav>
                    }
                    {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_subscribe') && 
                    <div className="widget footer-subscribe">
                      <h2 className="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_title')}</h2>
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content') && 
                      <p>{htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content'))}</p>
                      }
                      <SubscribeForm {...this.props} />
                    </div>
                    }
                  </div>
                </div>
              </div>
              <div className="site-info outer">
                <div className="inner">
                  {htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content'))}
                  &nbsp;
                </div>
              </div>
            </footer>
        );
    }
}
