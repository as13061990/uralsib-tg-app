import Background from '../components/Background';
import GameActions from '../actions/GameActions';
import Player from '../components/Player';
import User from '../data/User';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  public player: Player;
  public actions: GameActions = new GameActions(this);
  public bg: Background;
  public platforms: Phaser.Physics.Arcade.Group;
  public coins: Phaser.Physics.Arcade.Group;
  public gameOver: boolean;

  public init(): void {
    this.gameOver = false;
    User.resetScore();
  }

  public create(): void {
    this.bg = new Background(this);
    this.player = new Player(this);
    this.platforms = this.physics.add.group();
    this.coins = this.physics.add.group();
    this.physics.add.collider(this.player, this.platforms);
    this.actions.startPlatforms();
    this.actions.createClickZone();
    this.actions.setCollosions();
    this.actions.interval();
  }
}

export default Game;