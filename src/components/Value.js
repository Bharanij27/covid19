import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const Value = (props) => {
  let style = {
      'active' : 'alert-primary',
      'recovered':'alert-success',
      'cases':'alert-danger',
      'deaths':'alert-secondary'
  }

  const setActive = (el) => el.classList.add(style[props.class]);
  const removeActive = (el) => el.classList.remove(style[props.class])
  
  useEffect(()=>{
      let el = document.querySelector('.'+props.class);     
      if(props.active) setActive(el);
      else removeActive(el)
    }, [props]);

  return (
    <div className={ props.class + ' no-pad statitics col-sm-3 col-12 mt-3'}>
      <Alert
        className="no-pad"
        onClick={() =>props.setActive(props.class)}
      >
        <Alert.Heading className="h5">{props.head}</Alert.Heading>
          <div className="sub-content mb-2">
            {(props.subcontent) ? '+' + props.subcontent : ''}
          </div>
        <p className="content">
            {props.content}
        </p>
      </Alert>
    </div>
  );
};

export default Value;
