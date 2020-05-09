import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {graphql, StaticQuery} from 'gatsby'
import Post from '../components/Post'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Home page</h1>
    <StaticQuery
      query={indexQuery}
      render={({allMarkdownRemark}) => (
        <div>
          {allMarkdownRemark.edges.map(({node}) => (
            <Post
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              author={node.frontmatter.author}
              path={node.frontmatter.path}
            />
          ))}
        </div>
      )}
    />
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
            path
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
