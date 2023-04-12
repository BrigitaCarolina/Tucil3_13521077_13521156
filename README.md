# IF2211_Strategi Algoritma

## *Tucil3_13521077_13521156*
Tugas Kecil 3 IF2211 Strategi Algoritma<br>
Implementasi Algoritma UCS dan A* untuk Menentukan Lintasan Terpendek

## **Table of Contents**
* [Program Description](#program-description)
* [Required Program](#required-program)
* [How to Run The Program](#how-to-run-the-program)
* [Implementation Screenshots](#implementation-screenshots)
* [Progress Report](#progress-report)
* [Folders and Files Description](#folders-and-files-description)
* [Author](#author)

## **Program Description**
This program is a web based program that uses JavaScript language along with html and CSS. The main of this program is to find the shortest path given the start and goal node using the UCS and A* algorithm. This program accept the map file input in txt, reading it, and displaying the map using the Google Maps API. This program is the node.js program with the app.js framework. This program uses express library that can be downloaded using this command:
```
npm install express googlemaps --save
```

## **Required Program**
* To run this program you need to install Node.js<br>
The installer can be downloaded from https://nodejs.org/en/download then follow the procedure to install Node.js
* To run the web program, you need to have Web Browser, like Google Chrome, Firefox, Edge, etc

## **How to Run The Program**
### How to Run The Console Program
* Open the teminal/command prompt.
* Locate your path to /Console/Web/src
* Compile and run the mainProgram in the terminal by typing : <br>
`node mainProgram.js`

### How to Run The Web Program
* Open folder where this repository is saved
* Go to `Web/src` folder
* Open `index.html` file by double click the file or select the `index.html` file <br>
and right-click to select a browser to display the page in the "Open With"

## **Implementation Screenshots**
<img src="./program.png" width="450">

## **Progress Report**

| Point | Yes | No |
|:------|:---:|----|
|The program is able read graph input | &check; |    |
|The program can estimate the shortest path using UCS algorithm | &check; |  |
|The program can estimate the shortest path using A* algorithm | &check; |  |
|The program can display the shortest path and its distance | &check; |  |
|The program can read map input and use google maps API to display the map and the shortest path on map | &check; |  |


## **Folders and Files Description**
```bash 
Tucil3_13521077_13521156
 ├── doc
 │   └── Tucil3_13521077_13521156.pdf
 ├── Console
 │   ├── node-modules
 │   ├── src  
 │   │   ├── Astar.js
 │   │   ├── UCS.js
 │   │   ├── input.js
 │   │   ├── output.js
 │   │   ├── mainProgram.js
 │   │   ├── operation.js
 │   │   ├── PriorityQueue.js
 │   │   └── package.json
 │   └── test
 ├── Web
 │   ├── node-modules
 │   ├── src 
 │   │   ├── app.js
 │   │   ├── Astar.js
 │   │   ├── UCS.js
 │   │   ├── graph.js
 │   │   ├── index.html
 │   │   ├── input.js
 │   │   ├── map.js
 │   │   ├── PriorityQueue.js
 │   │   ├── package-lock.json
 │   │   └── package.json     
 │   └── test
 ├── program.png
 └── README.md
```

## **Author**
| Nama | NIM |
|:-----|:---:|
| Husnia Munzayana | 13521077 |
| Brigita Tri Carolina | 13521156 |
