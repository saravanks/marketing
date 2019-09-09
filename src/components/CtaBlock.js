import React from 'react';
import _ from 'lodash';

import {htmlToReact } from '../utils';
import JoinDialog from '../components/JoinDialog';

export default class CtaBlock extends React.Component {
    render() {
        return (
            <section id={_.get(this.props, 'section.section_id')} className="block cta-block outer">
              <div className="inner-large">
                <div className="grid">
                  <div className="cell block-content">
                    <h4 className="block-title">{_.get(this.props, 'section.title')}</h4>
                    {_.get(this.props, 'section.subtitle') && 
                    <p className="block-subtitle">
                      {htmlToReact(_.get(this.props, 'section.subtitle'))}
                    </p>
                    }
                  </div>
                </div>
                {_.get(this.props, 'section.actions') &&
                <div className="cell block-buttons">
                    {/* {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                    <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className="button">{_.get(action, 'label')}</Link>
                ))} */}
                <JoinDialog buttonText="Create your first project" />
                </div>
                }
              </div>
            </section>
        );
    }
}
