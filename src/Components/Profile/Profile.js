const Profile=()=>{
    const currentRole= JSON.parse(localStorage.getItem('currentuser'))
    const {email, username,role}=currentRole;
   
   return <>
      <div className="main-container" style={{background:'#7cb4b4',color:'white',minHeight: 'fit-content'}}>
        <br/>
         <h4>
           LoggedIn User Details
        </h4>
        <div>
            <p>username:{username}</p>
            <p> Role: {role}</p>
             <p>Email: {email}</p>
        </div>
      </div>
    
    </>
}

export default Profile;