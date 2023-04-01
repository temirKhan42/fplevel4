import Pusher from 'pusher-js';

export default class Socket {
  constructor() {
    const pusher = new Pusher('181714b03f5aa4d3cb65', {
      cluster: 'ap2',
    });
    this.pusher = pusher;
    this.message = pusher.subscribe('message');
    this.channel = pusher.subscribe('channel');
  }
  
  onAddMessage(cb) {
    this.message.bind('add-message', cb);
  }  

  onAddChannel(cb) {
    this.channel.bind('add-channel', cb);
  }  

  onRenameChannel(cb) {
    this.channel.bind('rename-channel', cb);
  }

  onRemoveChannel(cb) {
    this.channel.bind('remove-channel', cb);
  }

  unBinedMessage() {
    this.message.unbind_all();
  }
  
  unBinedChannel() {
    this.channel.unbind_all();
  }

  unSubscribe() {
    this.message.unsubscribe();
    this.channel.unsubscribe();
  }
}

