let channels = [
	{'name':'amol1'},
	{'name':'amol2'}
]

class Channel extends React.Component {
	onClick() {
		console.log('i was clicked', this.props.name);
	}
	render() {
		return (
			<li onClick={this.onClick.bind(this)}>{this.props.name}</li>
		)
	}
}

class ChannelList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.channels.map(channel => {
					return (
						<Channel name={channel.name}/>
					)}
				)}
			</ul>
		)
	}
}

class ChannelForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}
	onSubmit(e) {
		let {channelName} = this.state;
		console.log(channelName);
		this.props.addChannel(channelName);
		e.preventDefault();
		this.setState({
			channelName: ''
		});
	}
	onChange(e) {
		this.setState({
			channelName: e.target.value
		});
	}
	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<input type='text' onChange={this.onChange.bind(this)} value={this.state.channelName}/>
			</form>
		)
	}
}

class ChannelSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			channels : [
				{'name':'amol1'},
				{'name':'amol2'}
			]
		};
	}
	addChannel(name) {
		let {channels} = this.state;
		channels.push({name:name});
		this.setState({
			channels: channels
		});
	}
	render() {
		return (
			<div>
				<ChannelList channels={this.state.channels}/>
				<ChannelForm addChannel={this.addChannel.bind(this)}/>
			</div>
		)
	}
}

ReactDOM.render(<ChannelSection/>,document.getElementById('app'));