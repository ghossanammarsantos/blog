import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {graphql, StaticQuery} from 'gatsby'
import Post from '../components/Post'

const IndexPage = () => (
  <Layout pageTitle="CodeBlog">
    <SEO title="Home" />
    <StaticQuery
      query={indexQuery}
      render={({allMarkdownRemark}) => (
        <div>
          {allMarkdownRemark.edges.map(({node}) => (
            <Post
              key={node.id}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              author={node.frontmatter.author}
              body={node.excerpt}
              slug={node.fields.slug}
              image={node.frontmatter.imageUrl.childImageSharp.fluid}
              tags={node.frontmatter.tags}
            />
          ))}
        </div>
      )}
    />
  </Layout>
)

const indexQuery = graphql`
  {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: 4
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            imageUrl {
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
