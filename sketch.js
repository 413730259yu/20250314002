let input;
let slider;
let button;
let dropdown;
let iframe;
let yOffsets = [];

function setup() {
  // 這是一個設定函數，只會執行一次
  createCanvas(windowWidth, windowHeight);  // 設定畫布為視窗大小
  background('#ffe5ec');  // 設定背景顏色為 #ffe5ec

  const spacing = 20;  // 元件之間的間距
  const startX = 50;   // 元件起始位置
  const startY = 20;   // 元件的 Y 軸位置

  // 創建一個輸入文字框，並設置其位置和大小
  input = createInput('教育科技學系');
  input.position(startX, startY);
  input.size(300, 50);
  input.style('font-size', '18px');  // 設定字體大小
  input.style('background-color', '#ffc2d1');  // 設定背景顏色
  input.style('border', '2px solid #ff8fab');  // 設定邊框顏色
  input.style('border-radius', '10px');  // 設定圓角邊框
  input.style('padding', '8px');  // 增加內距
  input.style('color', '#184e77');  // 設定文字顏色
  input.style('font-family', 'Comic Sans MS, cursive, sans-serif');  // 設定字體

  // 創建一個滑桿，用於調整文字大小
  slider = createSlider(10, 100, 32);
  slider.position(startX + 320 + spacing, startY);  // 等距排列
  slider.style('width', '200px');  // 設定滑桿寬度
  slider.style('background-color', '#ffb3c6');  // 設定滑桿背景顏色

  // 創建一個按鈕，用於切換跳動效果
  button = createButton('切換跳動');
  button.position(startX + 320 + 220 + spacing * 2, startY);  // 等距排列
  button.style('font-size', '16px');  // 設定按鈕字體大小
  button.style('background-color', '#ff8fab');  // 設定按鈕背景顏色
  button.style('color', '#184e77');  // 設定按鈕文字顏色
  button.style('border', 'none');  // 移除按鈕邊框
  button.style('border-radius', '10px');  // 設定圓角邊框
  button.style('padding', '10px 20px');  // 設定按鈕內距
  button.mousePressed(toggleJump);

  // 創建一個下拉選單，用於選擇 iframe 的內容
  dropdown = createSelect();
  dropdown.position(startX + 320 + 220 + 150 + spacing * 3, startY);  // 等距排列
  dropdown.style('font-size', '16px');  // 設定下拉選單字體大小
  dropdown.style('background-color', '#fb6f92');  // 設定背景顏色
  dropdown.style('border', '2px solid #ff8fab');  // 設定邊框顏色
  dropdown.style('border-radius', '10px');  // 設定圓角邊框
  dropdown.style('padding', '5px');  // 設定內距
  dropdown.style('color', '#184e77');  // 設定選單文字顏色
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(updateIframe);

  // 創建一個 iframe，並設置其位置和大小
  iframe = createElement('iframe');
  iframe.size(windowWidth * 0.75, windowHeight * 0.75);  // 設置為視窗的 75%
  iframe.attribute('src', 'https://www.tku.edu.tw/');
  centerIframe();  // 呼叫置中函數

  // 初始化 yOffsets 陣列
  for (let i = 0; i < height / 50; i++) {
    yOffsets.push(0);
  }
}

function updateIframe() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

let jumping = false;

function toggleJump() {
  jumping = !jumping;
}

function draw() {
  // 這是一個繪圖函數，會一直執行
  background('#edf6f9');  // 每次都重設背景，避免畫面堆疊

  fill('#415a77');  // 設定文字顏色為 #415a77
  let textSizeValue = slider.value();  // 根據滑桿位置設置字體大小
  textSize(textSizeValue);

  let textContent = input.value();  // 獲取輸入框中的文字內容
  let x = 0;
  let y = 100;
  let lineIndex = 0;
  
  while (y < height) {  // 在不同位置繪製相同的文字
    x = 0;
    while (x < width) {
      let yOffset = jumping ? yOffsets[lineIndex] : 0;
      text(textContent, x, y + yOffset);
      x += textWidth(textContent) + 20;  // 增加文字間距
    }
    y += textSizeValue + 30;  // 增加行間距
    lineIndex++;
  }

  // 更新 yOffsets 陣列
  if (jumping) {
    for (let i = 0; i < yOffsets.length; i++) {
      yOffsets[i] = random(-5, 5);
    }
  }
}

function windowResized() {
  // 當視窗大小改變時，調用此函數
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth * 0.75, windowHeight * 0.75);  // 修改為視窗的 75%
  centerIframe();  // 呼叫置中函數

  // 更新下拉選單的位置
  dropdown.position(windowWidth * 0.75 - 150, dropdown.position().y);
}

function centerIframe() {
  // 計算置中的位置
  let x = (windowWidth - iframe.width) / 2;
  let y = (windowHeight - iframe.height) / 2;
  iframe.position(x, y);  // 設置 iframe 的位置
}