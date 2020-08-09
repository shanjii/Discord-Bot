const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.json')
const floppas = require('./floppas.json')
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);
    console.log(`Keep this window running while using the bot.`);
});



//Game parameters.
var loseText = 'You lost! type !game to restart.'
var winText = 'You won! type !game to restart.'
var render = ''
var player = ':red_square:'
var block = ':white_large_square:'
var startMessage = 'Game has started! Use the "wasd" to navigate the grid and reach the bottom without touching the hidden mines. \n Sometimes you may spawn on top of a mine though, cba to make an exception rule.'
var bomb = ':x:'
var mapWidth = 5
var mapHeight = 5
var bombGrid = []
var positionX = 3
var positionY = 1
var playerLost
var playerWin

client.on('message', msg => {
    switch (msg.content) {
        case '!game':
            msg.channel.send(startMessage)
            playerLost = 0
            playerWin = 0
            result = ''
            positionX = 3
            positionY = 1
            for (let index = 0; index < mapWidth; index++) {
                bombGrid[index] = Math.round(Math.random() * 5)
                console.log(bombGrid[index])
            }
            renderGame(msg)
            msg.channel.send(render)
            break;
        case 'd':
            if (playerLost == 0) {
                if (playerWin == 1) {
                    msg.channel.send(winText)
                } else {
                    positionX++
                    renderGame(msg)
                    msg.channel.send(render)
                }
            }
            else {
                msg.channel.send(loseText)
            } break;
        case 'w':
            if (playerLost == 0) {
                if (playerWin == 1) {
                    msg.channel.send(winText)
                } else {
                    positionY--
                    renderGame(msg)
                    msg.channel.send(render)
                }
            }
            else {
                msg.channel.send(loseText)
            } break;
        case 'a':
            if (playerLost == 0) {
                if (playerWin == 1) {
                    msg.channel.send(winText)
                } else {
                    positionX--
                    renderGame(msg)
                    msg.channel.send(render)
                }
            }
            else {
                msg.channel.send(loseText)
            }
            break;
        case 's':
            if (playerLost == 0) {
                if (playerWin == 1) {
                    msg.channel.send(winText)
                } else {
                    positionY++
                    renderGame(msg)
                    msg.channel.send(render)
                }
            }
            else {
                msg.channel.send(loseText)
            } break;
        case '!bigfloppa':
            const attachment = new Discord.MessageAttachment(floppas[Math.round(Math.random() * floppas.length - 1)].url);
            msg.channel.send(attachment);
            break;
        default:
            break;
    }
});

function renderGame() {
    render = ''
    switch (positionX) {
        case 0:
            positionX++
            break;
        case 6:
            positionX--
            break;
        default:
            break;
    }
    switch (positionY) {
        case 0:
            positionY++
            break;
        default:
            break;
    }
    for (let x = 1; x <= mapHeight; x++) {
        if (x == positionY) {
            scanHorizontal(hasPlayer = true, verticalIndex = x)
        } else {
            scanHorizontal(hasPlayer = false, verticalIndex = x)
        }
    }
    if (positionY == 6) {
        playerWin = 1
    }
}

function scanHorizontal() {
    if (hasPlayer == true) {
        for (let x = 1; x <= mapWidth; x++) {
            if (positionX != bombGrid[verticalIndex - 1]) {
                if (x == positionX) {
                    render = render + player
                }
                else {
                    render = render + block
                }
            } else {
                if (bombGrid[verticalIndex - 1] == x) {
                    render = render + bomb
                } else {
                    render = render + block
                }
                playerLost = 1
            }
        }
    }
    else {
        for (let x = 1; x <= mapWidth; x++) {
            if (playerLost == 1) {
                if (bombGrid[verticalIndex - 1] == x) {
                    render = render + bomb
                } else {
                    render = render + block
                }
            } else {
                render = render + block
            }
        }
    }
    render = render + '\n'
}


client.login(token.balana);