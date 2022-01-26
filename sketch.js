let arr = [];
let monoSynth;
let length = 25;

function setup() 
{
	createCanvas(800, 400);
    arr = GetRandomArr();
    console.log(arr);
    frameRate(180)
    monoSynth = new p5.MonoSynth();
}

let index = 0;
let swapped = false;
let green = false;

function draw()
{
    userStartAudio();
    background(0)
    BubbleSort();
}

function GetRandomArr() {
    let tempNumArr = [];
    for (let i = 0; i<length; i++) tempNumArr.push(i+1);

    for (let i = 0; i<length*length; i++) {
        Swap(tempNumArr, Math.floor(Math.random()*length), Math.floor(Math.random()*length))
    }

    return tempNumArr;
}

function Swap(arr, idx1, idx2) {
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
    return arr;
}

let mIndex = 0;
let mLength = 2;

function MergeSort() {

}

function IsSorted(arr) {
    for (let i = 0; i<arr.length-1; i++) {
        if (arr[i] > arr[i+1]) {
            return false;
        }
    }
    return true;
}

function BubbleSort() {
    monoSynth.play(map(arr[index], 0, length, 1000, 0), 0, deltaTime/1000);
    if (arr[index] > arr[index+1]) {
        Swap(arr, index, index+1);
        swapped = true;
    }
    index++;
    if (index === length) {
        index = 0;
        if (green) {
            swapped = false;
            green = false;
            frameRate(120);
            arr = GetRandomArr();
        }
        else if (!swapped) {
            frameRate(20);
            green = true;
        }
        else {
            swapped = false;
        }
    }

    let barWidth = width/length;
    let barHeight = (height-10)/length;
    arr.map((bar, idx) => {
        fill(255);
        if (green) {
            if (idx <= index) fill(0,255,0);
        }
        else if (idx === index) fill(0,255,0);
        rect(idx*barWidth, height-(bar*barHeight), barWidth, bar*barHeight);
    })
}
