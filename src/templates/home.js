import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';
import SEO from '../components/SEO';

export default class Home extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            <SEO title="Altostra" />

            {_.map(_.get(this.props, 'pageContext.frontmatter.sections'), (section, section_idx) => {
                let GetSectionComponent = components[_.get(section, 'component')];
                return (
                  <GetSectionComponent key={section_idx} {...this.props} section={section} site={this.props.pageContext.site} />
                )
            })}
            </Layout>
        );
    }
}
