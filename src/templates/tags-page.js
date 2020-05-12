import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {Badge, Button} from 'reactstrap'
import {slugify} from '../utils/utitlity'

const tagsPage = ({pageContext}) => {
  const {tags, tagPostCounts} = pageContext

  return (
    <Layout pageTitle="All Tags">
      <SEO title="All Tags" keywords={['tags', 'topics']} />
      <ul>
        <li>
          {tags.map(tag => (
            <li key={tag} style={{marginBottom: '10px'}}>
              <Button color="primary" href={`/tag/${slugify(tag)}`}>
                {tag} <Badge color="light">{tagPostCounts[tag]}</Badge>
              </Button>
            </li>
          ))}
        </li>
      </ul>
    </Layout>
  )
}

export default tagsPage
