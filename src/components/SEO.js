/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
// import useSiteHref from '../react-hooks/useSiteHref'

function SEO({ description, lang, meta, title, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            twitter,
            image,
            buildMetadata {
              deployUrl
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  // const location = window && window.location
  // const siteHref = useSiteHref()
  // const metaImage = (siteHref && `${siteHref}${image}`) || site.siteMetadata.image
  const metaImage = `${site.siteMetadata.buildMetadata.deployUrl}/${image}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // The title comes from the Layout component. No need to override it here.
      // title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: metaImage,
        },
        {
          name: `twitter:site:id`,
          content: site.siteMetadata.twitter,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
