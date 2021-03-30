import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getChangePasswordUserData } from "../../redux/actions/authActions";

const RedirectPage = (props) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.authReducer);

  let token;
  let email;

  if (props.location.search) {
    email = new URLSearchParams(props.location.search).get("email");
    token = new URLSearchParams(props.location.search).get("token");
  }

  useEffect(() => {
    dispatch(getChangePasswordUserData({ email }));
  }, []);

  if (id) {
    return <Redirect to={`/change-password?token=${token}`} />;
  }

  return (
    <div>
      <div>Redirect Page</div>
    </div>
  );
};

export default RedirectPage;
