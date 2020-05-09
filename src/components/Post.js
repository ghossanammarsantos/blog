import React from 'react'
import {Link} from 'gatsby'
import {Card, CardTitle, CardText, CardSubtitle, CardBody} from 'reactstrap'

const Post = ({title, author, path, date, body}) => (
  <Card>
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