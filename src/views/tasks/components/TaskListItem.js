import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Rating from 'react-rating';

const TaskListItem = ({ task, onEditClick }) => {
  const dispatch = useDispatch();
  const { id, title, description, duration, content, fees , programType } = task;

  return (
    <Col>
    <Card className="h-100">
      <Card.Img src="/img/product/small/product-1.webp" className="card-img-top sh-22" alt="card image" />
      <Card.Body>
        <h5 className="heading mb-0">
          <NavLink to={`details/${id}`} className="body-link stretched-link">
            {title}
          </NavLink>
        </h5>
      </Card.Body>
      <Card.Footer className="border-0 pt-0">
        <div className="mb-2">
          <Rating
            initialRating={5}
            readonly
            emptySymbol={<i className="cs-star text-primary" />}
            fullSymbol={<i className="cs-star-full text-primary" />}
          />
          <div className="text-muted d-inline-block text-small align-text-top ms-1">(39)</div>
        </div>
        <div className="card-text mb-0">
          <div className="text-muted text-overline text-small">
            <del>$ 36.50</del>
          </div>
          <div>$ 28.75</div>
        </div>
      </Card.Footer>
    </Card>
  </Col>
  );
};

export default React.memo(TaskListItem);
