import React from 'react';
import './styles.css';

const Profile = () => {
  return (
    <div className="profile">
        <div className="container">
        <div className="left">
            <div className="profile-left">
            <img src="https://avatars3.githubusercontent.com/u/17098281?s=460&v=4" alt="profile" className="profile-img"/>
            </div>
        </div>
        <div className="profile-right">
            <h1>John Doe</h1>
            <h4>Software Engineer</h4>
            <h4>Software Engineer</h4>
            <h4>Software Engineer</h4>
        </div>  
    </div>
    </div>
  )
}

export default Profile;