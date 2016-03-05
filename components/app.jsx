import React, {Component} from 'react';
import ChannelSection from './channels/channelsection.jsx';
import UserSection from './users/usersection.jsx';
import MessageSection from './messages/messagesection.jsx';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: [],
			activeChannel: {},
			users: [],
			messages: []
		}
	}
	addChannel(name) {
		let {channels} = this.state;
		channels.push({id: channels.length, name});
		this.setState({channels});
	}
	setChannel(activeChannel) {
		this.setState({activeChannel});
	}
	setUserName(name) {
		let {users} = this.state;
		users.push({id: users.length, name});
		this.setState({users});
	}
	addMessage(body) {
		let {activeChannel} = this.state;
		let {messages, users} = this.state;
		let createdAt = new Date;
		let author = users.length > 0 ? users[0].name : 'anonymous';
		messages.push({id: messages.length, body, createdAt, author});
		this.setState({messages});
	}
	render() {
		return (
			<div className='app'>
				<div className='nav'>
					<ChannelSection 
						channels={this.state.channels}
						addChannel={this.addChannel.bind(this)}
						setChannel={this.setChannel.bind(this)}
						activeChannel={this.state.activeChannel}
					/>
					<UserSection
						{...this.state}
						setUserName={this.setUserName.bind(this)}
					/>
			
				</div>
				<MessageSection
					{...this.state}
					addMessage={this.addMessage.bind(this)}
				/>
			</div>
		)
	}
}

export default App