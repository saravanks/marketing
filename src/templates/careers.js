import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {getPages, Link, safePrefix} from '../utils';

export default class Careers extends React.Component {
    render() {
        let display_jobs = _.orderBy(getPages(this.props.pageContext.pages, '/jobs'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <div class="outer">
              <div class="inner">
                <div class="post-feed">
                  {_.map(display_jobs, (job, job_idx) => (
                  <article key={job_idx} class="post post-card">
                    <div class="post-card-inside">
                      {_.get(job, 'frontmatter.thumb_img_path') && 
                      <Link class="post-card-thumbnail" to={safePrefix(_.get(job, 'url'))}>
                        <img class="thumbnail" src={safePrefix(_.get(job, 'frontmatter.thumb_img_path'))} alt={_.get(job, 'frontmatter.title')} />
                      </Link>
                      }
                      <div class="post-card-content">
                        <header class="post-header">
                          <h2 class="post-title"><Link to={safePrefix(_.get(job, 'url'))} rel="bookmark">{_.get(job, 'frontmatter.title')}</Link></h2>
                        </header>
                        <div class="post-excerpt">
                          <p>{_.get(job, 'frontmatter.excerpt')}</p>
                        </div>
                        <footer class="post-meta">
                          <time class="published"
                            datetime={moment(_.get(job, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(job, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
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
