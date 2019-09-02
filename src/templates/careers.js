import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import components, {Layout} from '../components/index';
import {getPages, Link, safePrefix} from '../utils';

export default class Careers extends React.Component {
    render() {
        let display_jobs = _.orderBy(getPages(this.props.pageContext.pages, '/jobs'), 'frontmatter.date', 'desc');
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
              <div className="inner">
                <div className="post-feed">
                  {_.map(display_jobs, (job, job_idx) => (
                  <article key={job_idx} className="post post-card">
                    <div className="post-card-inside">
                      {_.get(job, 'frontmatter.thumb_img_path') && 
                      <Link className="post-card-thumbnail" to={safePrefix(_.get(job, 'url'))}>
                        <img className="thumbnail" src={safePrefix(_.get(job, 'frontmatter.thumb_img_path'))} alt={_.get(job, 'frontmatter.title')} />
                      </Link>
                      }
                      <div className="post-card-content">
                        <header className="post-header">
                          <h2 className="post-title"><Link to={safePrefix(_.get(job, 'url'))} rel="bookmark">{_.get(job, 'frontmatter.title')}</Link></h2>
                        </header>
                        <div className="post-excerpt">
                          <p>{_.get(job, 'frontmatter.excerpt')}</p>
                        </div>
                        <footer className="post-meta">
                            <div className="location">{_.get(job, 'frontmatter.location')}</div>
                            {/*<time className="published"
                            dateTime={moment(_.get(job, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(job, 'frontmatter.date')).strftime('%B %d, %Y')}</time>*/}
                        </footer>
                      </div>
                    </div>
                  </article>
                  ))}
                </div>
              </div>
            </div>
            </Layout>
        );
    }
}
