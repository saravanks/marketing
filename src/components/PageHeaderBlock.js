import React from 'react';
import _ from 'lodash';

import {safePrefix, markdownify, Link} from '../utils';

export default class PageHeaderBlock extends React.Component {
    render() {
        return (
            <section id={_.get(this.props, 'section.section_id')} className="block page-header-block bg-accent">
            <div className="bg-image" style={{backgroundImage: _.get(this.props, 'section.bg_image')}}></div>
              <div className="inner outer-hero">
                <div className="grid">
                  <div className="cell block-content">
                    <h2 className="block-title">{_.get(this.props, 'section.title')}</h2>
                    <div className="block-copy">
                      {markdownify(_.get(this.props, 'section.content'))}
                    </div>
                    {_.get(this.props, 'section.actions') &&
                    <p className="block-buttons">
                      {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                      <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className="button white large">{_.get(action, 'label')}</Link>
                      ))}

                    </p>
                    }
                  </div>
                </div>
              </div>
              <div className="wave" style={{position:'relative', bottom:'-10px'}} aria-hidden="true">
                  <svg viewBox="0 0 2060 187" xmlns='http://www.w3.org/2000/svg'>
                      <g fill="none" fillRule="evenodd">
                          <path className="path1" d="M2060 0v62.124C1030 62.124 1030 177 0 177v-6.544C1060.445 177 1009.883 0 2060 0z" fill="#E5E6FF"></path>
                          <path className="path2" d="M2060 186.859H0v-11.047C1030 175.812 1071.994 29.39 2060 61v125.859z" fill="#f7f9fb"></path>
                      </g>
                  </svg>
              </div>
            </section>
        );
    }
}
