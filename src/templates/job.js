import React from 'react';
import _ from 'lodash';
// import moment from 'moment-strftime';

import components, {Layout} from '../components/index';
import {safePrefix, htmlToReact} from '../utils';
import ApplyToJob from '../components/ApplyToJob';

export default class Job extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            {/* SECTIONS */}
            {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
                let GetSectionComponent = components[_.get(section, 'component')];
                return (
                    <GetSectionComponent key={section_idx} {...this.props} section={section} site={this.props.pageContext.site} />
                    )

                })}
            {/* /SECTIONS */}
            <div className="outer">
              <div className="inner-medium">
                <article className="post post-full">
                  <header className="post-header">
                    <h1 className="post-title">{/*{_.get(this.props, 'pageContext.frontmatter.title')}*/}</h1>
                  </header>
                  {_.get(this.props, 'pageContext.frontmatter.content_img_path') && 
                  <div className="post-thumbnail">
                    <img src={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img_path'))} alt={_.get(this.props, 'pageContext.frontmatter.title')} />
                  </div>
                  }
                  {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                  <div className="post-subtitle">
                    {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                  </div>
                  }
                  <div className="post-content">
                    {htmlToReact(_.get(this.props, 'pageContext.html'))}
                  </div>
                  {/* <footer className="post-meta">
                    <time className="published"
                      dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%A, %B %e, %Y')}</time>
                  </footer> */}
                </article>
              
                <ApplyToJob buttonText="Apply" buttonSize="large" job={_.get(this.props, 'pageContext.frontmatter.title')} />
              </div>
              
            </div>

            </Layout>
        );
    }
}
 