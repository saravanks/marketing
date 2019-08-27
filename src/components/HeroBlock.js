import React from 'react';
import _ from 'lodash';

import {safePrefix, markdownify, Link} from '../utils';
import JoinDialog from './JoinDialog';

export default class HeroBlock extends React.Component {
    render() {
        return (
            <section id={_.get(this.props, 'section.section_id')} class="block hero-block bg-accent">
              <div class="inner outer-hero">
                <div class="grid">
                  {_.get(this.props, 'section.image') && 
                  <div class="cell block-preview">
                    <img src={safePrefix(_.get(this.props, 'section.image'))} alt={_.get(this.props, 'section.title')} />
                  </div>
                  }
                  <div class="cell block-content">
                    <h2 class="block-title underline">{_.get(this.props, 'section.title')}</h2>
                    <div class="block-copy">
                      {markdownify(_.get(this.props, 'section.content'))}
                    </div>
                    {_.get(this.props, 'section.actions') && 
                    <JoinDialog buttonText="JOIN BETA" buttonColor="white" buttonSize="large" />
                    // <p class="block-buttons">
                    //   {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                    //   <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} class="button white large">{_.get(action, 'label')}</Link>
                    //   ))}
                      
                    // </p>
                    }
                  </div>
                </div>
              </div>
                <div class="wave" style={{position:'relative', bottom:'-10px'}} aria-hidden="true">
                    <svg viewBox="0 0 2060 187" xmlns='http://www.w3.org/2000/svg'>
                        <g fill="none" fill-rule="evenodd">
                            <path class="path1" d="M2060 0v62.124C1030 62.124 1030 177 0 177v-6.544C1060.445 177 1009.883 0 2060 0z" fill="#E5E6FF"></path>
                            <path class="path2" d="M2060 186.859H0v-11.047C1030 175.812 1071.994 29.39 2060 61v125.859z" fill="#f7f9fb"></path>
                        </g>
                    </svg>
                </div>
            </section>
        );
    }
}
