import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {Row, Col, Card, CardText, CardBody, CardTitle, Button} from 'reactstrap'
import JohnImage from '../images/john.jpg'
import JaneImage from '../images/jane.jpg'
import {slugify} from '../utils/utitlity'
import authors from '../utils/authors'

const TeamPage = () => (
  <Layout pageTitle="Our Team">
    <SEO title="Team" keywords={[`gatsby`, `application`, `react`]} />
    <Row className="mb-4">
      <div className="col-md-3">
        <img
          src={JohnImage}
          style={{maxWidth: '100%', minHeight: '100%'}}
          alt="John profile"
        />
      </div>
      <div className="col-md-8">
        <Card style={{minHeight: '100%'}}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardText>{authors[0].bio}</CardText>
            <Button
              className="text-uppercase"
              color="primary"
              href={`/author/${slugify(authors[0].name)}`}>
              View posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
    <Row className="mb-4">
      <div className="col-md-3">
        <img
          src={JaneImage}
          style={{maxWidth: '100%', minHeight: '100%'}}
          alt="Jane profile"
        />
      </div>
      <div className="col-md-8">
        <Card style={{minHeight: '100%'}}>
          <CardBody>
            <CardTitle>{authors[1].name}</CardTitle>
            <CardText>{authors[1].bio}</CardText>
            <Button
              className="text-uppercase"
              color="primary"
              href={`/author/${slugify(authors[1].name)}`}>
              View posts
            </Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default TeamPage
