import React, {Component} from 'react';
import MessageList from './messagelist.jsx';
import MessageForm from './MessageForm.jsx';

class MessageSection extends Component {
	render() {
		let {activeChannel} = this.props;
		return (
			<div className='messages-container panel panel-default'>
				<div className='panel-heading'><strong>{activeChannel.name || 'Select a Channel'}</strong></div>
				<div className='panel-body messages'>
					<MessageList {...this.props}/>
					<MessageForm {...this.props}/>
				</div>
			</div>
		)
	}
}

MessageSection.propTypes = {
	messages: React.PropTypes.array.isRequired,
	activeChannel: React.PropTypes.object.isRequired,
	addMessage: React.PropTypes.func.isRequired
}

export default MessageSection