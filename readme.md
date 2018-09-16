# SUPER TIC TAC TOE

### Play Here

https://axeleo.github.io/super-tic-tac-toe/

## Instructions

Tic tac toe with a strategic twist
To win you must cliam three boards in a row.
The twist when you place a quare the next player must play into a board relative to the position of the quare just played.
If the board has already been won by the next player may choose any unfinished board.

## Concept

SUPER TIC TAC TOE is a strategic variation on the classic two player game. I was aiming to turn tic-tac-toe into a fun and simple stratergy game with a high-level of replayability. The concept and rules are simple enough for anyone to pickup yet also allow players to plan and carefully consider their next moves. I gave it a retro style to give it an arcade game feel which I belive complements its simple design.

## Technologies

The game is built with a combination of HTML 5, CSS 3 , SASS and Javascript

The game was built so that all the logic restrained to javascript meaning the user could techincally play the  game in the console. The game uses arrays to store the players choices and check that data against another array holding all the possible win combinations.

I used SASS to animate a title mouseover which also required the ruby gem bourbon. I used various keyframing animations within the CSS to animate the cube pops and text shimmers.

## Challenges

The inital challenge of creating the game was thinking of how to create data structures that would allow the app to scale and allow an easy implementaion of relative board selection. Initially I wrote the html to be over descriptive, giving each gaem sqaure a unique combination of classes when searched in pairs to their parent game baord. before I implemented the relative board focus it became clear that this method had some scaling issues as it would been a nightmare to select things with the correct specifificty in the CSS. this approach also had the big drawback of bloating my code, although the names were apparent and very speficic, calling classes quickly created very long, less readable lines of code.
I restructed the data giving each game square a relative data point of 'cell'. This meant the the code was more like data and less like words. After this data structure overhaul implementing the relative board focus was actually quite simple.

The next biggest challenges were realted to creating smooth animations.

I was attempting to remove the sqaure pop effect on the blocks when they were not in focus. To do this I was attempting to remove all the classes and listeners from the unfocused blocks, then re adding them to any blocks to be in focus. I ran into quite a few bugs attempting to implment this feature so in the end I decided that my time was better spent finishing the other features. I would conisder still implementing this but it is also uncessacary as II belive the unfocus is enough of a visual cue.

Play testing was a little time consuming as the games can go on for a while.

### Known issues

Score counter occasianlly not working correctly.

One issue I ran into was creating a nice win effect animation on a board with js. I ended up going with a janky kind of for loop which would increment which block it was effecting by a set interval. A continuing problem with this feature was that all the boards were sharing the same counter and because all the animations were on the same counter the timings would change and occasionally stall depending on how many boards were active at once.


## Credits

        SOUND CREDITS - FX BY WWW.ZAPSPLAT.COM 
        SOUNDTRACK - EXCERPT FROM HOTLINE MIAMI SOUNDTRACK
