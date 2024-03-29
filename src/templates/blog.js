import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import components, {Layout} from '../components/index';
import {getPages, Link, safePrefix} from '../utils';

export default class Blog extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
              let GetSectionComponent = components[_.get(section, 'component')];
              return (
                <GetSectionComponent key={section_idx} {...this.props} section={section} site={this.props.pageContext.site} />
              )

            })}
            <div className="careers-title"> Coming Soon
            </div>
            <p  className="careers-subtitle">
                <span className="join-us">Stay tuned...</span>
            </p>
            <div className="outer">
              <div className="inner">
                <div className="post-feed">
                  {_.map(display_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-card-inside">
                      {_.get(post, 'frontmatter.thumb_img_path') &&
                      <Link className="post-card-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                        <img className="thumbnail" src={safePrefix(_.get(post, 'frontmatter.thumb_img_path'))} alt={_.get(post, 'frontmatter.title')} />
                      </Link>
                      }
                      <div className="post-card-content">
                        <header className="post-header">
                          <h2 className="post-title"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{_.get(post, 'frontmatter.title')}</Link></h2>
                        </header>
                        <div className="post-excerpt">
                          <p>{_.get(post, 'frontmatter.excerpt')}</p>
                        </div>
                        <footer className="post-meta">
                          <time className="published"
                            dateTime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
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
