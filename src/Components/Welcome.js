import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Welcome = ({isLoggedIn}) => {
  const [displayedTitle, setDisplayedTitle] = useState('');

  useEffect(() => {
    const originalTitle = 'Weelcome to Feedback App';
    let index = 0;

    const intervalId = setInterval(() => {
      setDisplayedTitle((prevTitle) => prevTitle + originalTitle[index]);
      index += 1;

      if (index === originalTitle.length-1) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust the speed of the animation (milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      <h1 className='main-container-heading'>{displayedTitle}</h1>
      <p style={styles.description}>
        We value your feedback! Please login or sign up to get started.
      </p>
      <div style={styles.buttons}>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
        <Link to="/register" style={styles.button}>
          Register
        </Link>
      </div>
    </div>
  );
};



// ... (previous code)



const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '20px',
    border: '2px solid #fff', // Add border property for white border
    borderRadius: '5px', // Optional: Add border-radius for rounded corners
    padding: '10px',
    color: '#000', // Optional: Add padding for space inside the border
    width:'50%',
    textAlign:'center',
    marginLeft:'25%'
  },
  description: {
    fontSize: '1.2em',
    color: '#000',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '1em',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#000',
    backgroundColor: '#fff', // Change the color here
    borderRadius: '5px',
    margin: '0 10px',
    border:'1px solid black'
  },
};

export default Welcome;