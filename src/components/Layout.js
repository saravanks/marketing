import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import {safePrefix} from '../utils';
import Header from './Header';
import Footer from './Footer';
import SEO from '../components/SEO';


export default class Body extends React.Component {
    componentDidMount() {
        require('../analytics');
    }

    render() {
        const title = `${_.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' | '}${_.get(this.props, 'pageContext.site.siteMetadata.title')}`
        return (
            <React.Fragment>
                <SEO 
                    title={title}
                    image={_.get(this.props, 'pageContext.frontmatter.image')}
                    imageWidth={_.get(this.props, 'pageContext.frontmatter.imageWidth')}
                    imageHeight={_.get(this.props, 'pageContext.frontmatter.imageHeight')}
                    description={_.get(this.props, 'pageContext.frontmatter.description')}
                />
                <Helmet>
                    <title>{title}</title>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="google" content="notranslate" />
                    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,700i" rel="stylesheet"/>
                    <link rel="stylesheet" href={safePrefix('assets/css/main.css')}/>
                    <link rel="shortcut icon" href={safePrefix('images/favicon.png')} type="image/png" />
                </Helmet>
                <div id="page" className={'site palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette')}>
                  <Header {...this.props} />
                  <main id="content" className="site-content">
                    {this.props.children}
                  </main>
                  <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}
