// =========================
// MEETING + VOTING SYSTEM
// =========================

class Meeting {
  constructor(players, bots) {
    this.active = true;

    this.players = players;
    this.bots = bots;

    this.votes = new Map();
    this.timeLeft = 30; // seconds
    this.result = null;
  }

  vote(voterId, targetId) {
    if (!this.active) return;
    this.votes.set(voterId, targetId);
  }

  update() {
    if (!this.active) return;

    this.timeLeft--;

    if (this.timeLeft <= 0) {
      this.endMeeting();
    }
  }

  endMeeting() {
    this.active = false;

    let tally = {};

    // count votes
    this.votes.forEach(v => {
      tally[v] = (tally[v] || 0) + 1;
    });

    // find highest voted
    let maxVotes = 0;
    let eliminated = null;

    for (let id in tally) {
      if (tally[id] > maxVotes) {
        maxVotes = tally[id];
        eliminated = id;
      }
    }

    this.result = eliminated;

    // eliminate bot if matched
    this.bots.forEach(b => {
      if (b.id === eliminated) {
        b.dead = true;
      }
    });

    // eliminate player (optional hook)
    if (this.players.id === eliminated) {
      this.players.dead = true;
    }
  }
}

// =========================
// GLOBAL MEETING STATE
// =========================

let currentMeeting = null;

// start meeting
function startMeeting(player, bots) {
  currentMeeting = new Meeting(player, bots);
}

// call vote UI (simple placeholder)
function castVote(voter, targetId) {
  if (currentMeeting) {
    currentMeeting.vote(voter, targetId);
  }
}

// update meeting
function updateMeeting() {
  if (currentMeeting) {
    currentMeeting.update();
  }
}
