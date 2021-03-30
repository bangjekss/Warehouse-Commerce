import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderPage } from "..";
import { Link, Redirect } from "react-router-dom";
import { accentColor, primaryColor, surfaceColor } from "../../helpers";
import { makeStyles } from "@material-ui/core";
import { Fade } from "react-reveal";
import {
  HomeAdminPage,
  InvoiceAdminPage,
  ProductAdminPage,
  ProfileAdminPage,
} from "../../pages/admin";
import { getDashboard, logoutAction } from "../../redux/actions";
import Swal from "sweetalert2";

const menusSideBar = [
  { icon: "bi bi-house", value: "Dashboard", link: "/admin/dashboard" },
  { icon: "bi bi-hdd", value: "Products", link: "/admin/products" },
  {
    icon: "bi bi-journal-text",
    value: "Transactions",
    link: "/admin/transactions",
  },
];
const AuthMenuSideBar = [
  { icon: "bi bi-emoji-smile", value: "Profile", link: "/admin/profile" },
  { icon: "bi bi-key", value: "Logout", link: "" },
];

const Dashboard = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { isLogin, isLoading, username, roleId } = useSelector(
    (state) => state.authReducer
  );

  const [current, setCurrent] = useState(0);
  const [openProduct, setOpenProduct] = useState(false);

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  const handleLogoutBtn = () => {
    Swal.fire({
      title: "Logout",
      text: "You will be returned to home page",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAction());
        return <Redirect to="/" />;
      }
    });
  };

  // if (isLoading) return <LoaderPage />;
  // if (isLogin && roleId === 2) return <Redirect to="/login" />;
  if (!isLogin) return <Redirect to="/login" />;

  const renderMenuSideBar = () => {
    return menusSideBar.map((menu, index) => {
      return (
        <Link to={menu.link} key={menu.value} className={styles.menuListItem}>
          <i
            className={menu.icon}
            style={{ fontSize: 20, marginRight: 15 }}
          ></i>
          <div style={{ fontSize: 15 }}>{menu.value}</div>
        </Link>
      );
    });
  };

  const renderAuthMenuSideBar = () => {
    return AuthMenuSideBar.map((menu, index) => {
      if (menu.value === "Logout")
        return (
          <div className={styles.menuListItem} onClick={handleLogoutBtn}>
            <i
              className={menu.icon}
              style={{ fontSize: 20, marginRight: 15 }}
            ></i>
            <div style={{ fontSize: 15 }}>{menu.value}</div>
          </div>
        );
      return (
        <Link to={menu.link} key={menu.value} className={styles.menuListItem}>
          <i
            className={menu.icon}
            style={{ fontSize: 20, marginRight: 15 }}
          ></i>
          <div style={{ fontSize: 15 }}>{menu.value}</div>
        </Link>
      );
    });
  };

  return (
    <div className="d-flex" style={{ maxWidth: "100wh" }}>
      <div
        style={{
          width: "30%",
          maxWidth: 300,
          minWidth: 300,
          minHeight: "100vh",
          boxShadow: "1px 0 10px 1px rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            backgroundImage: 'url("https://i.imgur.com/bNGZmNQ.jpg")',
            height: 125,
            display: "flex",
            alignItems: "flex-end",
            padding: 20,
          }}
        >
          <div className="d-flex align-items-end">
            <div className="mr-3">
              <img
                src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                alt="file_err"
                width="50"
                height="50"
                style={{
                  objectFit: "contain",
                  backgroundColor: primaryColor,
                  borderRadius: 50,
                }}
              />
            </div>
            <div>
              <div>{username}</div>
              <div style={{ fontSize: 12, color: "gray" }}>Administrator</div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: 10, paddingInline: 20, paddingTop: 20 }}>
            <div
              style={{
                textTransform: "uppercase",
                fontWeight: 600,
                color: "gray",
              }}
            >
              authentication
            </div>
          </div>
          <div>
            <div>{renderAuthMenuSideBar()}</div>
          </div>
          <div style={{ marginBottom: 10, paddingInline: 20, paddingTop: 20 }}>
            <div
              style={{
                textTransform: "uppercase",
                fontWeight: 600,
                color: "gray",
              }}
            >
              Menu
            </div>
          </div>
          <div>{renderMenuSideBar()}</div>
        </div>
        <div
          style={{ marginBottom: 10, paddingInline: 20, paddingTop: 20 }}
        ></div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  menuListItem: {
    display: "flex",
    alignItems: "center",
    lineHeight: 2,
    cursor: "pointer",
    color: "black",
    paddingLeft: 20,
    "&:hover": {
      backgroundColor: "rgba(97, 177, 90, 0.3)",
      textDecoration: "none",
      color: "black",
    },
  },
});

export default Dashboard;
