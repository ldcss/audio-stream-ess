import React from 'react';
import logoSpocinfy from "../../assets/logoSpocinfy.png";

function Navbar() {
  return (
    <header style={{width: '100vw', height: '75px', backgroundColor:'#1F2232'}}>
    <img src={logoSpocinfy} alt="Logo" style={{height: '325px', position: 'relative', top: '-102px', left: '-810px'}} />

      <h1>OLÁ</h1>
    </header>
  );
}

export default Navbar;
