TO START THE GAME:
    - Set up the game board (as a grid or a canvas).
    - Create the snake with its initial segments.
    - Select the starting direction (RIGHT, etc.).
    - Initialize food randomly on a cell.
    - Set the timer interval speed.
    - Set the score = 0.

GAME LOOP (repeat every number of milliseconds):
    - Receive player input and then set the new direction.
        - Forbid reverse direction of snake (for example, if the snake is going RIGHT the snake can not go LEFT).
         
    - Determine the new head position based on the current direction.
    
    - Determine any collisions:
        IF the new head hits the wall OR it connects with its body:
            --> END THE GAME
            --> show game over message
            --> with an option to restart
         
    - Determine if food is eaten:
        IF head position == food position:
            - Add on a new head (do not remove the tail......snake grows)
            - increase the score
            - put new food, in a free cell
        ELSE:
            - Add on a new head and remove the tail (normal snake movement).
          
    - Clear the whole board and re-draw everything:
        - Draw the snake
        - Draw the food
        - Draw the updated score
          
CONTROLS:
     - When the player hits an arrow key: 
        - Update the direction - unless it is opposite of the current direction.
 
END LOOP