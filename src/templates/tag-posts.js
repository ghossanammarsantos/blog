import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {graphql} from 'gatsby'
import Post from '../components/Post'

const tagPosts = ({data, pageContext}) => {
  const {tag} = pageContext
  const {totalCount} = data.allMarkdownRemark
  const pageHeader = `${totalCount} post${
    totalCount > 1 ? 's' : ''
  } tagged with "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
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

export const tagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}}}
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
  }
`

export default tagPosts
