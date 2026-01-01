import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import API from '../api';

function Start() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tableNumber = searchParams.get('table');
    if (!tableNumber) {
      alert("Invalid QR code: table number missing.");
      return;
    }

    async function validateTable() {
      try {
        // const res = await API.get(`/tables/check/${tableNumber}`);
        localStorage.setItem("tableNumber", tableNumber);
        navigate("/menu");
      } catch (err) {
        alert("Invalid or inactive table.");
      }
    }

    validateTable();
  }, [navigate, searchParams]);

  return <p style={{ color: "#fff" }}>Starting session...</p>;
}

export default Start;
