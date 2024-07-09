# Arcade-Project

Welcome to the Arcade-Project! This is a fullstack game arcade that leverages the power of C for computational purposes, Flask to handle client-side communication, and Javascript/HTML for the UI and game logic. The primary objective is to offer a variety of games that users can interact with at high speeds, thanks to efficient function calls in the background.

## Programming Languages and Technologies

- **C**: Used for processing large text files quickly.
- **JavaScript**: Utilized for game development and functionalities that do not require significant computational power.
- **Python**: Facilitates communication between C and JavaScript by sending C function results to JavaScript using a Flask server.

## Inter-Language Communication Methods

- **Foreign Function Interface**: C functions are called within JavaScript using SWIG.
- **HTTP REST API**: Python sets up the Flask APIs, which are then called from JavaScript.

## Deployment Steps

1. Initialize the project with Vagrant:
   ```sh
   vagrant up
   ```
2. Navigate to the project directory:
   ```sh
   cd project/arcade
   ```
3. Compile the C functions with SWIG:
   ```sh
   swig -python -py3 func.i
   gcc -fPIC -c func.c func_wrap.c -I/usr/include/python3.8
   ld -shared func.o func_wrap.o -o _func.so
   ```
4. Install Flask and start the servers:
   ```sh
   sudo apt install flask
   python3 server.py &
   python3 -m http.server
   ```
5. Open your browser and go to `localhost:8000` to access the arcade main page.

## Game Instructions

### Hangman

- A random word from a selection of 17,000 words will appear hidden.
- Each correct guess will reveal the corresponding letter(s) in the word.
- Incorrect guesses do not reveal any letters and are represented by the "_" character.

### Snake

- The goal is to grow the snake as long as possible by eating food pieces.
- The game speeds up as the snake grows longer.
- Collision with walls or the snake's own body results in a game over.
- Use the arrow keys to control the snake.

## Features

- **User Interface**: Designed to be simple and appealing. For instance, in Hangman, each letter button is disabled and changes color after its first use, making it easy for users to see which letters have already been guessed.
- **Performance**: Functions are optimized for computational efficiency, ensuring minimal lag during gameplay.

Enjoy the games and have fun!
