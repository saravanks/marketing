import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout, CareersHeroBlock} from '../components/index';
import {getPages, Link, safePrefix} from '../utils';

export default class Careers extends React.Component {
    render() {
        let display_jobs = _.orderBy(getPages(this.props.pageContext.pages, '/jobs'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <CareersHeroBlock
              id="careers-hero-block"
              title="Careers"
              content=""
              image="images/feature1.png"
            />
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
                          <time className="published"
                            dateTime={moment(_.get(job, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(job, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
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
