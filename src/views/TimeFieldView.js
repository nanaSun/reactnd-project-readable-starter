import React from 'react'
import MyEditor from './EditorView';
import moment from 'moment';
class TimeFieldView extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			timestamp:this.props.timestamp||new Date().getTime()
		}
	}
	changeToDate(timestamp){
		return moment(parseInt(timestamp)).format('YYYY-MM-DD HH:mm:ss')
	}	
	render(){
	  let {timestamp}=this.state;
	  return (<div className="form-group">
	    <label htmlFor="timestamp">time</label>
	    <p>{this.changeToDate(timestamp)}</p>
	    <input className="form-control" type="hidden" name="timestamp" defaultValue={timestamp}/>
	  </div>)
	}
}
export default TimeFieldView