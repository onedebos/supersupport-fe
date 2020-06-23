import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { usersSelector } from "../features/users/UserSlice";

const Dashboard = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);

  // useEffect(() => {
  //   let cancelled = false;
  //   if (!cancelled) {
  //     // dispatch(keepUserSignedIn);
  //   }

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [dispatch]);

  if (!user) {
    return <> </>;
  }

  return (
    <Container className="m-auto mb-4">
      <Row className="justify-content-center mt-4">
        <Col sm={8}>
          <div className="jumbotron mt-4">
            <>
              <small className="p-2 bg-warning font-weight-bold text-white rounded-sm mb-4">
                {user.user ? `${user.user.role} account` : <> </>}
              </small>
              <h1 className="display-4 font-weight-bold mt-4">
                Hi, {user.user ? user.user.name : <> </>}!
              </h1>

              <p className="lead">
                Get all the help you need at the click of a button.
              </p>
              <div className="my-4">
                <p>Let's get started!.</p>
                <p className="lead">
                  <Link
                    to="/createticket"
                    className="btn btn-primary btn-lg"
                    href="#"
                    role="button"
                  >
                    Create a ticket
                  </Link>
                </p>
              </div>
            </>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
