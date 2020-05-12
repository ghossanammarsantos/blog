import React from 'react'
import Layout from '../components/layout'
import Post from '../components/Post'
import {graphql} from 'gatsby'

const postList = ({data, pageContext}) => {
  const posts = data.allMarkdownRemark.edges
  const {currentPage} = pageContext

  return (
    <Layout pageTitle={`Page : ${currentPage}`}>
      {posts.map(({node}) => (
        <Post
          key={node.id}
          slug={node.fields.slug}
          title={node.frontmatter.title}
          author={node.frontmatter.author}
          date={node.frontmatter.date}
          body={node.frontmatter.body}
          tags={node.frontmatter.tags}
          image={node.frontmatter.imageUrl.childImageSharp.fluid}
        />
      ))}
    </Layout>
  )
}

export const postListQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: $limit
      skip: $skip
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

export default postList
