const {slugify} = require('./src/utils/utitlity')
const path = require('path')

const onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions

  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle,
    })
  }
}

const createPages = ({actions, graphql}) => {
  const {createPage} = actions
  const singlePostTemplate = path.resolve('src/templates/single-post.js')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges

    posts.map(({node}) =>
      createPage({
        path: node.fields.slug,
        component: singlePostTemplate,
        context: {
          // Passing slug for template to use to get post
          slug: node.fields.slug,
        },
      }),
    )
  })
}

module.exports = {onCreateNode, createPages}
