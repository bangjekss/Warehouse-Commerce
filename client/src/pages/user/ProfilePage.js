import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import noProfilePic from "../../assets/noProfilePic.png";
import {
  GeneralProfile,
  NewAddress,
  ProfilePic,
  UserDetailTransactionModal,
  ReviewModal,
  UserTransactionCard,
} from "../../components/user";
import AddressCard from "../../components/user/AddressCard";

const ProfilePage = () => {
  const [lihatItem, setLihatItem] = useState(false);
  const [review, setReview] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { provinsi, kota, kecamatan, kelurahan } = useSelector(
    (state) => state.daerahReducer
  );

  const { transactionData } = useSelector((state) => state.transactionReducer);
  const { isFinished, isLogin } = useSelector((state) => state.authReducer);

  const { id, name, username, email, phone, imagepath } = useSelector(
    (state) => state.authReducer
  );

  const onClickLihatItem = (index) => {
    setLihatItem(!lihatItem);
    setSelectedTransaction(index);
  };

  const onClickReview = (index) => {
    setReview(!review);
    setSelectedTransaction(index);
  };

  if (isFinished && !isLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "48px",
        }}
      >
        <div
          style={{
            height: "200px",
            width: "200px",
            flex: "1",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "54px",
            }}
          >
            Profile
          </div>
          <ProfilePic
            imagepath={imagepath}
            noProfilePic={noProfilePic}
            userId={id}
          />
          <div
            style={{
              margin: "27px 0 0 0",
            }}
          >
            <GeneralProfile
              name={name}
              username={username}
              email={email}
              phone={phone}
            />
          </div>
          <div
            style={{
              margin: "24px 0 0 0",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                margin: "0 0 8px 0",
              }}
            >
              Address
            </div>
            <AddressCard />
            <NewAddress
              id={id}
              provinsi={provinsi}
              kota={kota}
              kecamatan={kecamatan}
              kelurahan={kelurahan}
            />
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              margin: "12px 0 8px 0",
            }}
          >
            Transaction
          </div>
          <UserTransactionCard
            data={transactionData}
            lihatItem={onClickLihatItem}
            review={onClickReview}
          />
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              margin: "24px 0 8px 0",
            }}
          >
            Security
          </div>
          <div
            style={{
              fontSize: "24px",
            }}
          >
            Password
          </div>

          <div
            style={{
              height: "100px",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
              }}
              to="/forget-password"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>
      <UserDetailTransactionModal
        lihatItem={lihatItem}
        toggle={onClickLihatItem}
        data={transactionData}
        selected={selectedTransaction}
      />
      <ReviewModal
        review={review}
        toggle={onClickReview}
        data={transactionData}
        selected={selectedTransaction}
      />
    </div>
  );
};

export default ProfilePage;
