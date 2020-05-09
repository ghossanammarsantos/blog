import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {graphql, StaticQuery} from 'gatsby'
import Post from '../components/Post'
import {Row, Col} from 'reactstrap'
import Sidebar from '../components/Sidebar'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
    <Row>
      <Col md="8">
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
                  image={node.frontmatter.image.childImageSharp.fluid}
                  tags={node.frontmatter.tags}
                />
              ))}
            </div>
          )}
        />
      </Col>
      <Col md="4">
        <Sidebar />
      </Col>
    </Row>
  </Layout>
)

const indexQuery = graphql`
  {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
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
