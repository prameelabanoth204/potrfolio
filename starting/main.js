class Field {
    constructor(field) {
      this.field = field;
      this.position = [0, 0];
    }
  
    print() {
      let fieldString = '';
      this.field.forEach(row => {
        fieldString += row.join(' ') + '\n';
      });
      console.log(fieldString);
    }
  
    move(direction) {
      switch (direction) {
        case 'up':
          this.position[0] -= 1;
          break;
        case 'down':
          this.position[0] += 1;
          break;
        case 'left':
          this.position[1] -= 1;
          break;
        case 'right':
          this.position[1] += 1;
          break;
      }
      if (
        this.position[0] < 0 ||
        this.position[0] >= this.field.length ||
        this.position[1] < 0 ||
        this.position[1] >= this.field[0].length
      ) {
        console.log('You have stepped outside of the field!');
        process.exit();
      }
      if (this.field[this.position[0]][this.position[1]] === 'O') {
        console.log('You have fallen into a hole!');
        process.exit();
      }
      if (this.field[this.position[0]][this.position[1]] === '^') {
        console.log('You have found your hat!');
        process.exit();
      }
      this.field[this.position[0]][this.position[1]] = '*';
    }
  
    static generateField(height, width, percentHoles) {
      const field = [];
      for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
          if (Math.random() < percentHoles / 100) {
            row.push('O');
          } else {
            row.push('░');
          }
        }
        field.push(row);
      }
      const hatRow = Math.floor(Math.random() * height);
      const hatCol = Math.floor(Math.random() * width);
      field[hatRow][hatCol] = '^';
      return field;
    }
  }
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░']
  ]);
  
  const play = () => {
    myField.print();
    rl.question('Where would you like to move? (up, down, left, right)\n', answer => {
      myField.move(answer);
      play();
    });
  };
  
  play();