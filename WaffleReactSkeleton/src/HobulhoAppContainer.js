import React, { Component } from 'react';
import HobulhoApp from './HobulhoApp'

class HobulhoAppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "Jayeon Yi",
      questions: [
        {
          subject: "Cheese",
          choice: "like"
        },
        {
          subject: "Salmon",
          choice: "dislike"
        },
        {
          subject: "Pasta",
          choice: "dislike"
        },
        {
          subject: "Dejava",
          choice: "like"
        },
        {
          subject: "Ramen",
          choice: "like"
        },
        {
          subject: "Apple",
          choice: "like"
        }
      ]
    };
  }

  render() {
    return (
      <div className="container root-wrapper" style={{backgroundColor:"#CCCCCC"}}>
        <HobulhoApp {...this.state} />
      </div>
    );
  }
}

export default HobulhoAppContainer;
