var bcrypt = require("bcrypt");

function newRound() {
  var players = [];
  var salt = bcrypt.genSaltSync();
  var hash;
}

function genTicket() {
  var percent = function() {
    var temp = 1.00;
    for (var i = 0; i < (Math.floor(Math.random() * 3) + 1); i++) {
      temp *= (Math.random() + .01)
      console.log(temp)
    }
    return temp;
  }
  return (percent() * 100)
}

genTicket()
// function newRound() {
//   itemsInPot = []
//   botsInPot = []
//   Players = []
//   playersTickets = {}
//   salt = bcrypt.genSaltSync()
//   winningTicket = genTicket()
//   stringTicket = winningTicket.toString()
//   hash = bcrypt.hashSync(stringTicket, salt)
//   hash = hash.slice(29)
//   log.info('winning ticket: ' + winningTicket)
//   currentRound++
//   playersHands = []
//   numberOfItems = 0
//   numberOfTickets = 0
//   allTickets = []
//   playersItemCount = []
//   setTimeout(clean, 5000)

//   setTimeout(function() {
//     rounds.create({
//       hash: hash,
//       salt: salt,
//       winnerpercentage: winningTicket,
//       roundid: currentRound,
//       current: true,
//       type: 1
//     }).then(function() {
//       ready = true;
//       roundUpdateInfo()
//     }).catch(function() {
//       newRound()
//     })
//   }, 500)
// }
