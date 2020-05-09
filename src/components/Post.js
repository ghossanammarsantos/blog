import React from 'react'
import {Link} from 'gatsby'
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Badge,
} from 'reactstrap'
import Img from 'gatsby-image'
import {slugify} from '../utils/utitlity'

const Post = ({title, author, slug, date, body, image, tags}) => (
  <Card>
    <Link to={slug}>
      <Img className="card-image-top" fluid={image}></Img>
    </Link>
    <CardBody>
      <CardTitle>
        <Link to={slug}>{title}</Link>
      </CardTitle>
      <CardSubtitle>
        <span className="text-info">{date}</span> by{' '}
        <span className="text-info">{author}</span>
      </CardSubtitle>
      <CardText>{body}</CardText>
      <ul className="post-tags">
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tag/${slugify(tag)}`}>
              <Badge color="primary" className="text-uppercase">
                {tag}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
      <Link className="btn btn-outline-primary float-right" to={slug}>
        Read more
      </Link>
    </CardBody>
  </Card>
)

export default Post
