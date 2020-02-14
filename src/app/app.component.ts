import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flytbase-Assignment';
  n: number = 22  //rows
  m: number = 20  //columns
  row = []
  column = []
  start = []
  end = []
  direction = "up"
  path = []
  ngOnInit() {
    this.column = []
    this.row = []
    for (let i = 1; i <= this.m; i++) {
      if (i % 2 != 0) {
        this.column.push(i, 0)
      } else {
        this.column.push(i)
      }
    }
    for (let i = 1; i <= this.n; i++) {
      this.row.push(i)
    }
  }
  select(row, col) {
    if (this.start.length == 0) {
      this.start = [row, col]
      // document.getElementById("R" + row + "C" + col).className="bg-danger"
      document.getElementById("R" + row + "C" + col).style.backgroundColor = 'red'
      document.getElementById("R" + row + "C" + col).innerText = "S"
    } else if (this.end.length == 0) {
      this.end = [row, col]
      // document.getElementById("R" + row + "C" + col).className="bg-success"
      document.getElementById("R" + row + "C" + col).style.backgroundColor = 'green'
      document.getElementById("R" + row + "C" + col).innerText = "E"
      this.findPath()
    }
    console.log("start:" + this.start, "end:" + this.end);
  }
  changeDirection() {
    if (this.direction == "up") {
      this.direction = "down"
    } else {
      this.direction = "up"
    }
  }
  reset() {
    if (this.start.length > 0) {
      document.getElementById("R" + this.start[0] + "C" + this.start[1]).style.backgroundColor = "rgb(110, 110, 110)"
      document.getElementById("R" + this.start[0] + "C" + this.start[1]).innerHTML = "&nbsp"
    }
    this.path.forEach(_ => {
      document.getElementById(_).style.backgroundColor = "rgb(110, 110, 110)"
      document.getElementById(_).innerHTML = "&nbsp"
    })
    this.start = []
    this.end = []
    this.path = []
    console.log(this.path);

  }
  findPath() {
    this.path.push("R" + this.start[0] + "C" + this.start[1])
    if (this.direction == "up") {
      //for upward path
      if (this.start[1] == this.end[1]) {
        //start and end in same col
        if (this.start[0] > this.end[0]) {
          for (let i = this.start[0] - 1; i > this.end[0]; i--) {
            let cell = "R" + i + "C" + this.start[1]
            this.path.push(cell)
            document.getElementById(cell).style.background = "blue"
            document.getElementById(cell).innerText = "^"
          }
        } else {
          if (this.start[1] < this.m) {
            //same col by right
            for (let i = this.start[0] - 1; i > 1; i--) {
              let cell = "R" + i + "C" + this.start[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "^"
            }
            ////////////////////////////
            if (this.start[0] != 1) {
              this.path.push("R1C" + this.start[1])
              document.getElementById("R1C" + this.start[1]).style.background = "blue"
              document.getElementById("R1C" + this.start[1]).innerText = ">"
            }
            for (let i = 1; i < this.n; i++) {
              let cell = "R" + i + "C" + (this.start[1] + 1)
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "v"
            }
            this.path.push("R" + this.n + "C" + (this.start[1] + 1))
            document.getElementById("R" + this.n + "C" + (this.start[1] + 1)).style.background = "blue"
            document.getElementById("R" + this.n + "C" + (this.start[1] + 1)).innerText = "<"
            for (let i = this.n; i > this.end[0]; i--) {
              let cell = "R" + i + "C" + this.end[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "^"
            }
          } else {
            //same col by left
            for (let i = this.start[0] - 1; i > 1; i--) {
              let cell = "R" + i + "C" + this.start[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "^"
            }
            if (this.start[0] != 1) {
              this.path.push("R1C" + this.start[1])
              document.getElementById("R1C" + this.start[1]).style.background = "blue"
              document.getElementById("R1C" + this.start[1]).innerText = "<"
            }
            for (let i = 1; i < this.n; i++) {
              let cell = "R" + i + "C" + (this.start[1] - 1)
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "v"
            }
            this.path.push("R" + this.n + "C" + (this.start[1] - 1))
            document.getElementById("R" + this.n + "C" + (this.start[1] - 1)).style.background = "blue"
            document.getElementById("R" + this.n + "C" + (this.start[1] - 1)).innerText = ">"
            for (let i = this.n; i > this.end[0]; i--) {
              let cell = "R" + i + "C" + this.end[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "^"
            }
          }
        }
      } else {
        //different col
        for (let i = this.start[0] - 1; i > 1; i--) {
          let cell = "R" + i + "C" + this.start[1]
          this.path.push(cell)
          document.getElementById(cell).style.background = "blue"
          document.getElementById(cell).innerText = "^"
        }
        if (this.start[1] < this.end[1]) {
          let i
          if (this.start[0] == 1) { i = this.start[1] + 1 } else { i = this.start[1] } //for start cell
          for (i; i < this.end[1]; i++) {
            let cell = "R" + 1 + "C" + i
            this.path.push(cell)
            document.getElementById(cell).style.background = "blue"
            document.getElementById(cell).innerText = ">"
          }
        } else {
          let i
          if (this.start[0] == 1) { i = this.start[1] - 1 } else { i = this.start[1] } //for start cell
          for (i; i > this.end[1]; i--) {
            let cell = "R" + 1 + "C" + i
            this.path.push(cell)
            document.getElementById(cell).style.background = "blue"
            document.getElementById(cell).innerText = "<"
          }
        }

        for (let i = 1; i < this.end[0]; i++) {
          let cell = "R" + i + "C" + this.end[1]
          this.path.push(cell)
          document.getElementById(cell).style.background = "blue"
          document.getElementById(cell).innerText = "v"
        }
      }
    } else {
      // for downward path
      if (this.start[1] == this.end[1]) {
        //start and end in same col
        if (this.start[0] < this.end[0]) {
          for (let i = this.start[0] + 1; i < this.end[0]; i++) {
            let cell = "R" + i + "C" + this.start[1]
            this.path.push(cell)
            document.getElementById(cell).style.background = "blue"
            document.getElementById(cell).innerText = "v"
          }
        } else {
          if (this.start[1] < this.m) {
            //same col by right
            for (let i = this.start[0] + 1; i < this.n; i++) {
              let cell = "R" + i + "C" + this.start[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "v"
            }
            if (this.start[0] != this.n) {
              this.path.push("R" + this.n + "C" + this.start[1])
              document.getElementById("R" + this.n + "C" + this.start[1]).style.background = "blue"
              document.getElementById("R" + this.n + "C" + this.start[1]).innerText = ">"
            }
            for (let i = this.n; i > 1; i--) {
              let cell = "R" + i + "C" + (this.start[1] + 1)
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "^"
            }
            this.path.push("R1" + "C" + (this.start[1] + 1))
            document.getElementById("R1" + "C" + (this.start[1] + 1)).style.background = "blue"
            document.getElementById("R1" + "C" + (this.start[1] + 1)).innerText = "<"
            for (let i = 1; i < this.end[0]; i++) {
              let cell = "R" + i + "C" + this.end[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "v"
            }
          } else {
            //same col by left
            for (let i = this.start[0] + 1; i < this.n; i++) {
              let cell = "R" + i + "C" + this.start[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "v"
            }
            if (this.start[0] != this.n) {
              this.path.push("R" + this.n + "C" + this.start[1])
              document.getElementById("R" + this.n + "C" + this.start[1]).style.background = "blue"
              document.getElementById("R" + this.n + "C" + this.start[1]).innerText = "<"
            }
            for (let i = this.n; i > 1; i--) {
              let cell = "R" + i + "C" + (this.start[1] - 1)
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "^"
            }
            this.path.push("R1" + "C" + (this.start[1] - 1))
            document.getElementById("R1" + "C" + (this.start[1] - 1)).style.background = "blue"
            document.getElementById("R1" + "C" + (this.start[1] - 1)).innerText = ">"
            for (let i = 1; i < this.end[0]; i++) {
              let cell = "R" + i + "C" + this.end[1]
              this.path.push(cell)
              document.getElementById(cell).style.background = "blue"
              document.getElementById(cell).innerText = "v"
            }
          }
        }
      } else {
        for (let i = this.start[0] + 1; i < this.n; i++) {
          let cell = "R" + i + "C" + this.start[1]
          this.path.push(cell)
          document.getElementById(cell).style.background = "blue"
          document.getElementById(cell).innerText = "v"
        }
        if (this.start[1] < this.end[1]) {
          let i
          if (this.start[0] == this.n) { i = this.start[1] + 1 } else { i = this.start[1] } //for start cell
          for (i; i < this.end[1]; i++) {
            let cell = "R" + this.n + "C" + i
            this.path.push(cell)
            document.getElementById(cell).style.background = "blue"
            document.getElementById(cell).innerText = ">"
          }
        } else {
          let i
          if (this.start[0] == this.n) { i = this.start[1] - 1 } else { i = this.start[1] } //for start cell
          for (i; i > this.end[1]; i--) {
            let cell = "R" + this.n + "C" + i
            this.path.push(cell)
            document.getElementById(cell).style.background = "blue"
            document.getElementById(cell).innerText = "<"
          }
        }
        for (let i = this.n; i > this.end[0]; i--) {
          let cell = "R" + i + "C" + this.end[1]
          this.path.push(cell)
          document.getElementById(cell).style.background = "blue"
          document.getElementById(cell).innerText = "^"
        }
      }
    }
    this.path.push("R" + this.end[0] + "C" + this.end[1])
    console.log(this.path);
  }
}
