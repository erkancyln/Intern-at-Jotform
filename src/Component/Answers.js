import React, { Component } from 'react'

export default class SubmissionItem extends Component
{
  render()
  {
    const {qid,form_id,created_at,ip}=this.props;
    return (
      <div>
        <h1>{qid}</h1>
        
      </div>
    )
  }
}
