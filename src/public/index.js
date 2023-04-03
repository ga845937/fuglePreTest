const socket = new WebSocket("ws://localhost:3000/streaming");

socket.addEventListener('message', function (event) {
    console.log(event.data);
});

function sub() {
    const data = {
        currency: ["btcusd", "btceur"],
        event: "subscribe"
    }
    socket.send(JSON.stringify(data));
}

function unSub() {
    const data = {
        currency: ["btceur"],
        event: "unsubscribe"
    }
    socket.send(JSON.stringify(data));
}
