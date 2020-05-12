const {slugify} = require('./src/utils/utitlity')
const path = require('path')
const authors = require('./src/utils/authors')
const _ = require('lodash')

exports.onCreateNode = ({node, actions}) => {
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

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions

  const templates = {
    singlePost: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
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

    posts.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          slug: node.fields.slug,
          imageUrl: authors.find(
            author => author.name === node.frontmatter.author,
          ).imageUrl,
        },
      })
    })

    // Get all tags
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    // ['design', 'code', ...]
    // { design: 5, code: 2, ...}
    let tagPostCounts = {}
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })

    tags = _.uniq(tags)

    createPage({
      path: '/tags',
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts,
      },
    })
  })
}
