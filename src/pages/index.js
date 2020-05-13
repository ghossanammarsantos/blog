import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {graphql, StaticQuery} from 'gatsby'
import Post from '../components/Post'
import PaginationLinks from '../components/PaginationLinks'

const IndexPage = () => {
  const postsPerPage = 4
  let numberOfPages

  return (
    <Layout pageTitle="CodeBlog">
      <SEO title="Home" />
      <StaticQuery
        query={indexQuery}
        render={({allMarkdownRemark}) => {
          numberOfPages = Math.ceil(allMarkdownRemark.totalCount / postsPerPage)

          return (
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
              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            </div>
          )
        }}
      />
    </Layout>
  )
}

const indexQuery = graphql`
  {
    allMarkdownRemark(
      sort: {fields: [frontmatter___date], order: DESC}
      limit: 4
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

export default IndexPage
