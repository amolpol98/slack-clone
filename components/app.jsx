import React, {Component} from 'react';
import ChannelSection from './channels/channelsection.jsx';
import UserSection from './users/usersection.jsx';
import MessageSection from './messages/messagesection.jsx';
import Socket from '../socket.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: [],
			activeChannel: {},
			users: [],
			messages: [],
			connected: false
		}
	}
	componentDidMount() {
		let socket = this.socket = new Socket();
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this);
		socket.on('add channel', this.onAddChannel.bind(this));
		socket.on('user add', this.onAddUSer.bind(this));
		socket.on('user edit', this.onEditUSer.bind(this));
		socket.on('user remove', this.onRemoveUser.bind(this));
		socket.on('message add', this.onAddMessage.bind(this));
	}
	onConnect() {
		this.setState({connected:true});
		this.socket.emit('channel subscribe');
		this.socket.emit('channel unsubscribe');
	}
	onDisconnect() {
		this.setState({connected:false});
	}
	onAddUSer(user) {
		let {users} = this.state;
		users.push(user);
		this.setState({users});
	}
	onEditUSer(editUser) {
		let {users} = this.state;
		users = users.map(user => {
			if(editUser.id === user.id) {
				return editUser;
			}
			return user;
		});
		this.setState({users});
	}
	onRemoveUser(removeUser) {
		let {users} = this.state;
		users = users.filter(user => {
			return user.id !== removeUser.id;
		});
		this.setState({users});
	}
	onAddMessage(message) {
		let {messages} = this.state;
		messages.push(message);
		this.setState({messages});
	}
	onAddChannel(channel) {
		let {channels} = this.state;
		channels.push(channel);
		this.setState({channels});
	}
	addChannel(name) {
		this.socket.emit('channel add',{name});
	}
	setChannel(activeChannel) {
		this.setState({activeChannel});
		this.socket.emit('channel unsubscribe');
		this.setState({messages: []});
		this.socket.emit('channel subscribe',
			{channelId: activeChannel.id});
	}
	setUserName(name) {
		this.socket.emit('user add', {name});
	}
	addMessage(body) {
		let {activeChannel} = this.state;
		this.socket.emit('message add',
			{channelId: activeChannel.id, body});
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