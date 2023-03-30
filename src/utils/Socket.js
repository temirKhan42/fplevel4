import Pusher from 'pusher-js';

export default class Socket {
  constructor() {
    const pusher = new Pusher('181714b03f5aa4d3cb65', {
      cluster: 'ap2',
    });
    this.pusher = pusher;
  }
  
  onAddMessage(cb) {
    const channel = this.pusher.subscribe('message');
    channel.bind('add-message', cb);
  }  

  onAddChannel(cb) {
    const channel = this.pusher.subscribe('channel');
    channel.bind('add-channel', cb);
  }  

  onRemoveChannel(cb) {
    const channel = this.pusher.subscribe('channel');
    channel.bind('remove-channel', cb);
  }  

  onRenameChannel(cb) {
    const channel = this.pusher.subscribe('channel');
    channel.bind('rename-channel', cb);
  }
}

