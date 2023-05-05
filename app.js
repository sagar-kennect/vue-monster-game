function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      curruntRound: 0,
      winner: null,
      logMessageArry: []
    }

  },
  computed: {
    monsterhBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' }
      }
      return { width: this.monsterHealth + '%' }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' }
      }
      return { width: this.playerHealth + '%' }
    },
    mayUseSpecialAttack() {
      return this.curruntRound % 3 !== 0
    }
  }
  ,
  watch: {
    playerHealth(value) {

      if (value <= 0 && this.monsterHealth <= 0) {

        console.log("drwa")
        this.winner = "draw"
      } else if (value <= 0) {
        this.winner = "monster"
        console.log("Player Lost")
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        console.log("drwa")
      } else if (value <= 0) {
        this.winner = "player"
        console.log("Monster Lost")
      }
    }
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.curruntRound = 0;
      this.logMessageArry = []

    },
    attackMonster() {
      this.curruntRound++
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue)
      this.attackPlayer()


    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15)
      this.playerHealth -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue)
    },
    specialAttackMonster() {
      this.curruntRound++
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue)
      this.attackPlayer();
    },

    surrender() {
      this.winner = 'monster'

    },

    addLogMessage(who, what, value) {
      this.logMessageArry.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      })



    },

    healPlayer() {
      this.curruntRound++
      const healValue = getRandomValue(8, 20)
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100
      } else {
        this.playerHealth += healValue
      }
      this.addLogMessage('player', 'heal', healValue)
      this.attackPlayer();

    }
  }
})


app.mount("#game")

