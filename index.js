const io = require('socket.io')(8000,{cors: {origin:"*"}});

let totalVotes = 0;
let votingPolls = {
    'Fresh-Menu POD': 0,
    'Fresh-Order POD': 0,
    'DO/DD POD': 0,
    'GLOCC POD': 0
}

io.on('connection',socket =>{

    //Send Current Data of Votes to user when visited the site
    socket.emit('update',{votingPolls,totalVotes})

    socket.on('send-vote',voteTo =>{
        totalVotes += 1;
        console.log(voteTo)
        votingPolls[voteTo] += 1;
        socket.broadcast.emit('receive-vote',{votingPolls,totalVotes});
        socket.emit('update',{votingPolls,totalVotes})
    })
})