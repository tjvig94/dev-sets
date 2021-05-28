import React, { useState, useEffect } from 'react';
import './Likes.css'

class Like extends React.Component {
    state = {
      count: 0
    };
  
    handleClick = e => {
      const count = this.state.count;
      this.setState({ count: count + 1 });
      
    };
  
    render() {
      return (
        <div>
          <button  className='likes' onClick={this.handleClick}>
            <div><i class="far fa-heart"></i>{this.state.count}</div>
          </button>
        
        </div>
      );
    }
  }

  export default Like;