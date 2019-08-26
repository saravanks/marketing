import React from 'react';
import _ from 'lodash';

import {Link, safePrefix, htmlToReact} from '../utils';
import Social from './Social';
import SubscribeForm from './SubscribeForm';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" class="site-footer">
              <div class="wave-footer" aria-hidden="true">
                <svg width="auto" height="auto" viewBox="0 0 2060 137" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <path class="path1" d="M0 0c393.11 119.844 807.532 100.397 1131.565 45.246C1397.404 0 1603.94-26.618 2060 49.769v51.317C909.022-58.747 1032.495 251.14 0 87.94V0z" fill="#E5E6FF">
                    </path><path class="path2" d="M0 0h2060v63.824C1026.921-96.01 1177.132 224.25 0 50.822V0z" fill="#F7F9FB"></path>
                  </g>
                </svg>
              </div>
              <div class="footer-top outer">
                <div class="inner">
                  <div class="footer-widgets">
                    <div class="widget footer-branding">
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.logo_img') ? 
                      <p class="site-logo">
                        <Link to={safePrefix('/')}><img src={safePrefix(_.get(this.props, 'pageContext.site.siteMetadata.footer.logo_img'))} alt="Logo" /></Link>
                      </p>
                       : 
                      <p class="site-title">
                        <Link to={safePrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title')}</Link>
                      </p>
                      }
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.tagline') && 
                      <p class="site-description">
                        {_.get(this.props, 'pageContext.site.siteMetadata.footer.tagline')}
                      </p>
                      }
                    </div>
                    {((_.get(this.props, 'pageContext.menus.secondary') && _.get(this.props, 'pageContext.site.siteMetadata.footer.has_nav')) || _.get(this.props, 'pageContext.site.siteMetadata.footer.has_social')) && 
                    <nav class="widget footer-navigation">
                      <div class="footer-nav-inside">
                        {(_.get(this.props, 'pageContext.menus.secondary') && _.get(this.props, 'pageContext.site.siteMetadata.footer.has_nav')) && 
                        <div class="secondary-nav">
                          <h2 class="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.nav_title')}</h2>
                          <ul class="secondary-menu">
                            {_.map(_.get(this.props, 'pageContext.menus.secondary'), (item, item_idx) => (
                            <li key={item_idx}>
                              <Link to={safePrefix(_.get(item, 'url'))}>{_.get(item, 'title')}</Link>
                            </li>
                            ))}
                          </ul>
                        </div>
                        }
                        {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_social') && 
                        <div class="social-nav">
                          <h2 class="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.social_title')}</h2>
                          <Social {...this.props} />
                        </div>
                        }
                      </div>
                    </nav>
                    }
                    {_.get(this.props, 'pageContext.site.siteMetadata.footer.has_subscribe') && 
                    <div class="widget footer-subscribe">
                      <h2 class="widget-title">{_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_title')}</h2>
                      {_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content') && 
                      <p>{htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.subscribe_content'))}</p>
                      }
                      <SubscribeForm {...this.props} />
                    </div>
                    }
                  </div>
                </div>
              </div>
              <div class="site-info outer">
                <div class="inner">
                  {htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content'))}
                  &nbsp;
                </div>
              </div>
            </footer>
        );
    }
}
