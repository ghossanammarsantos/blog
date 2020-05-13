import React from 'react'
import Layout from '../components/layout'
import Post from '../components/Post'
import {graphql} from 'gatsby'
import authors from '../utils/authors'

const authorPosts = ({data, pageContext}) => {
  const {totalCount} = data.allMarkdownRemark
  const author = authors.find(author => author.name === pageContext.authorName)
  const pageHeader = `${totalCount} Posts by ${pageContext.authorName}`
  const authorImageFluid = data.file.childImageSharp.fluid

  return (
    <Layout
      pageTitle={pageHeader}
      postAuthor={author}
      authorImageFluid={authorImageFluid}>
      {data.allMarkdownRemark.edges.map(({node}) => (
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

export const authorQuery = graphql`
  query($authorName: String!, $imageUrl: String!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {author: {in: [$authorName]}}}
    ) {
      totalCount
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
    file(relativePath: {eq: $imageUrl}) {
      childImageSharp {
        fluid(maxWidth: 300, maxHeight: 150) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default authorPosts
