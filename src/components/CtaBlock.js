import React from 'react';
import _ from 'lodash';

import {htmlToReact, Link, safePrefix} from '../utils';
import JoinDialog from '../components/JoinDialog';

export default class CtaBlock extends React.Component {
    render() {
        return (
            <section id={_.get(this.props, 'section.section_id')} class="block cta-block outer">
              <div class="inner-large">
                <div class="grid">
                  <div class="cell block-content">
                    <h4 class="block-title">{_.get(this.props, 'section.title')}</h4>
                    {_.get(this.props, 'section.subtitle') && 
                    <p class="block-subtitle">
                      {htmlToReact(_.get(this.props, 'section.subtitle'))}
                    </p>
                    }
                  </div>
                </div>
                {_.get(this.props, 'section.actions') &&
                <div class="cell block-buttons">
                    {/* {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                    <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} class="button">{_.get(action, 'label')}</Link>
                ))} */}
                <JoinDialog buttonText="Create your first project" />
                </div>
                }
              </div>
            </section>
        );
    }
}
