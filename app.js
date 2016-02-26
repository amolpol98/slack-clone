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
	render() {
		return (
			<div>
				<ChannelList channels={channels}/>
				<ChannelForm/>
			</div>
		)
	}
}

ReactDOM.render(<ChannelSection/>,document.getElementById('app'));