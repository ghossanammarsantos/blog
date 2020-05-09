import React from 'react'
import {Link} from 'gatsby'
import {Card, CardTitle, CardText, CardSubtitle, CardBody} from 'reactstrap'
import Img from 'gatsby-image'

const Post = ({title, author, path, date, body, image}) => (
  <Card>
    <Link to={path}>
      <Img className="card-image-top" fluid={image}></Img>
    </Link>
    <CardBody>
      <CardTitle>
        <Link to={path}>{title}</Link>
      </CardTitle>
      <CardSubtitle>
        <span className="text-info">{date}</span> by{' '}
        <span className="text-info">{author}</span>
      </CardSubtitle>
      <CardText>{body}</CardText>
      <Link className="btn btn-outline-primary float-right" to={path}>
        Read more
      </Link>
    </CardBody>
  </Card>
)

export default Post
