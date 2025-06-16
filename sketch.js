let img, bgImg, logoImg;
let currentScene = "start";
let logoAlpha = 0;
let fadingIn = true;
let logoTimer = 0;

// 게임 관련 변수
let allWords = ["한정판", "오리", "마이크", "DIY", "연필", "모자", "메타버스 호환", "의자", "조명", "NFC 장착", "우산", "물병"];
let selectedWords = [];
let madeItems = [];
let imageMap = {};
let gameState = "selecting";
let totalScore = 0;
let transitionAlpha = 0;
let transitioning = false;
let endingStarted = false;
let endingAlpha = 0;
let endingTimer = 0;
let endingImages = [];
let nextAddTime = 0;


let currentItem;
let step = 0;
let buy = 0;

function preload() {
img = loadImage("./monitor2.png");
bgImg = loadImage("./bg2.png");
logoImg = loadImage("./logo3.png");
bgImg2 = loadImage("./temu.png");

imageMap["한정판 오리 마이크"] = loadImage("./duckmic.png");
imageMap["DIY 오리 마이크"] = loadImage("./duckmic.png");
imageMap["메타버스 호환 오리 마이크"] = loadImage("./duckmic.png");
imageMap["NFC 장착 오리 마이크"] = loadImage("./duckmic.png");

imageMap["한정판 오리 모자"] = loadImage("./duckcap.png");
imageMap["DIY 오리 모자"] = loadImage("./duckcap.png");
imageMap["메타버스 호환 오리 모자"] = loadImage("./duckcap.png");
imageMap["NFC 장착 오리 모자"] = loadImage("./duckcap.png");

imageMap["한정판 오리 물병"] = loadImage("./duckcup.png");
imageMap["DIY 오리 물병"] = loadImage("./duckcup.png");
imageMap["메타버스 호환 오리 물병"] = loadImage("./duckcup.png");
imageMap["NFC 장착 오리 물병"] = loadImage("./duckcup.png");

imageMap["한정판 오리 조명"] = loadImage("./ducklamp.png");
imageMap["DIY 오리 조명"] = loadImage("./ducklamp.png");
imageMap["메타버스 호환 오리 조명"] = loadImage("./ducklamp.png");
imageMap["NFC 장착 오리 조명"] = loadImage("./ducklamp.png");

imageMap["한정판 연필 조명"] = loadImage("./pencillamp.png");
imageMap["DIY 연필 조명"] = loadImage("./pencillamp.png");
imageMap["메타버스 호환 연필 조명"] = loadImage("./pencillamp.png");
imageMap["NFC 장착 연필 조명"] = loadImage("./pencillamp.png");

imageMap["한정판 연필 마이크"] = loadImage("./pencilmic.png");
imageMap["DIY 연필 마이크"] = loadImage("./pencilmic.png");
imageMap["메타버스 호환 연필 마이크"] = loadImage("./pencilmic.png");
imageMap["NFC 장착 연필 마이크"] = loadImage("./pencilmic.png");

imageMap["한정판 연필 모자"] = loadImage("./pencilcap.png");
imageMap["DIY 연필 모자"] = loadImage("./pencilcap.png");
imageMap["메타버스 호환 연필 모자"] = loadImage("./pencilcap.png");
imageMap["NFC 장착 연필 모자"] = loadImage("./pencilcap.png");

imageMap["한정판 연필 물병"] = loadImage("./pencilcup.png");
imageMap["DIY 연필 물병"] = loadImage("./pencilcup.png");
imageMap["메타버스 호환 연필 물병"] = loadImage("./pencilcup.png");
imageMap["NFC 장착 연필 물병"] = loadImage("./pencilcup.png");

imageMap["한정판 의자 물병"] = loadImage("./ccup.png");
imageMap["DIY 의자 물병"] = loadImage("./ccup.png");
imageMap["메타버스 호환 의자 물병"] = loadImage("./ccup.png");
imageMap["NFC 장착 의자 물병"] = loadImage("./ccup.png");

imageMap["한정판 의자 마이크"] = loadImage("./cmic.png");
imageMap["DIY 의자 마이크"] = loadImage("./cmic.png");
imageMap["메타버스 호환 의자 마이크"] = loadImage("./cmic.png");
imageMap["NFC 장착 의자 마이크"] = loadImage("./cmic.png");

imageMap["한정판 의자 조명"] = loadImage("./clamp.png");
imageMap["DIY 의자 조명"] = loadImage("./clamp.png");
imageMap["메타버스 호환 의자 조명"] = loadImage("./clamp.png");
imageMap["NFC 장착 의자 조명"] = loadImage("./clamp.png");

imageMap["한정판 의자 모자"] = loadImage("./ccap.png");
imageMap["DIY 의자 모자"] = loadImage("./ccap.png");
imageMap["메타버스 호환 의자 모자"] = loadImage("./ccap.png");
imageMap["NFC 장착 의자 모자"] = loadImage("./ccap.png");

imageMap["한정판 우산 모자"] = loadImage("./umcap.png");
imageMap["DIY 우산 모자"] = loadImage("./umcap.png");
imageMap["메타버스 호환 우산 모자"] = loadImage("./umcap.png");
imageMap["NFC 장착 우산 모자"] = loadImage("./umcap.png");

imageMap["한정판 우산 마이크"] = loadImage("./ummic.png");
imageMap["DIY 우산 마이크"] = loadImage("./ummic.png");
imageMap["메타버스 호환 우산 마이크"] = loadImage("./ummic.png");
imageMap["NFC 장착 우산 마이크"] = loadImage("./ummic.png");

imageMap["한정판 우산 물병"] = loadImage("./umcup.png");
imageMap["DIY 우산 물병"] = loadImage("./umcup.png");
imageMap["메타버스 호환 우산 물병"] = loadImage("./umcup.png");
imageMap["NFC 장착 우산 물병"] = loadImage("./umcup.png");

imageMap["한정판 우산 조명"] = loadImage("./umlamp.png");
imageMap["DIY 우산 조명"] = loadImage("./umlamp.png");
imageMap["메타버스 호환 우산 조명"] = loadImage("./umlamp.png");
imageMap["NFC 장착 우산 조명"] = loadImage("./umlamp.png");


}

function setup() {
  createCanvas(500, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (currentScene === "start") {
    drawStartScene();
  } else if (currentScene === "logo") {
    drawLogoScene();
  } else if (currentScene === "game") {
    if (gameState === "selecting") {
      showWordSelection();
    } else if (gameState === "showing") {
      showCurrentItem();
    } else if (gameState === "scoreSummary") {
      showScoreSummary();
    } else if (gameState === "final") {
      showFinalPage();
    } else if (gameState === "ending") {
      showEndingScene();
    }
  }
}



function drawStartScene() {
  background(bgImg);
  let hovered = (mouseY > 140 && mouseY < 460 && mouseX > 80 && mouseX < 410);
  let scale = hovered ? 1.04 : 1;
  let w = width * scale;
  let h = height * scale;
  image(img, -10, 0, w, h);

  if (hovered) {
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text("출근하기", width / 2, 270);
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function drawLogoScene() {
  background(0);
  tint(255, logoAlpha);
  imageMode(CENTER);
  image(logoImg, width / 2, height / 2, 500, 600);
  imageMode(CORNER);
  noTint();

  if (fadingIn) {
    logoAlpha += 3;
    if (logoAlpha >= 255) {
      logoAlpha = 255;
      fadingIn = false;
      logoTimer = millis();
    }
  } else {
    if (millis() - logoTimer > 1000) {
      logoAlpha -= 3;
      if (logoAlpha <= 0) {
        logoAlpha = 0;
        currentScene = "game";
        gameState = "selecting";
        selectedWords = [];
        madeItems = [];
        step = 0;
      }
    }
  }
}

function mousePressed() {
  if (currentScene === "start") {
    if (mouseY > 100 && mouseY < 460) {
      currentScene = "logo";
      logoAlpha = 0;
      fadingIn = true;
    }
  } else if (currentScene === "game") {
    if (gameState === "selecting") {
      checkWordSelection();
    } else if (gameState === "showing") {
      if (step < 6) {
        gameState = "selecting";
        selectedWords = [];
      } else {
        // 모든 발명품 만들고 나면 총합 점수 계산
        totalScore = madeItems.reduce((acc, item) => acc + item.score, 0);
        gameState = "scoreSummary";
      }
    } else if (gameState === "scoreSummary") {
      // 다음 버튼 누르면 final 페이지로 페이드인 전환
      if (
        mouseX > width / 2 - 90 && mouseX < width / 2 + 90 &&
        mouseY > 480 && mouseY < 520
      ) {
        transitioning = true;
        transitionAlpha = 0;
      }
    }
  }
}


// ---------------- 게임 UI ----------------
function showWordSelection() {
  background(0);
  fill(255);
  textSize(18);
  fill(255);
  text("근로자 님, 출근하신 걸 환영합니다.", width/2, 40);
  text("오늘도 쓸모없는 물건을 발명하세요.", width/2, 70);
  textSize(14)
  text("쓸모없음 점수가 높을수록 더 많은 보상을 받는다는 것을 잊지마세요.", width/2, 450);

  textSize(14);
  fill(255,0,0)
  text("각 세로줄에 하나씩 총 3개의 단어를 선택하세요.", width/2, 150);
  textSize(70);

  textSize(15);
  let btnW = 130, btnH = 40;
  for (let i = 0; i < allWords.length; i++) {
    let x = 40 + (i % 3) * 140;
    let y = 180 + floor(i / 3) * 60;
    fill(selectedWords.includes(allWords[i]) ? color(255, 150, 0) : 255);
    rect(x, y, btnW, btnH, 10);
    fill(0);
    text(allWords[i], x + btnW / 2, y + btnH / 2);
  }
}

function showCurrentItem() {
  background(0);
  fill(255);
  text("쓸모없는 발명품 #" + step, width/2, 30);
  image(currentItem.img, width/2 - 150, 66, 300, 340);
  fill(255);
  rectMode(CENTER);
  fill(255);
  textSize(20);
  text(currentItem.name, width/2, 430);
  textSize(15);
  text("쓸모없음 점수:", width/2, 460);
  textSize(40);
  fill(255,0,0);
  text(currentItem.score, width/2, 510);
  fill(255);
  rect(width/2, 568, 190, 37);
  fill(0);
  textSize(15);
  text("클릭해서 다음 발명품 만들기", width/2, 570);
  rectMode(CORNER);
}
function showScoreSummary() {
  background(0);
  fill(255);
  textSize(24);
  text("오늘 만든 발명품들의 총 쓸모없음 점수는...", width / 2, 100);
  text("당신이 번 돈은...", width / 2, 300);

  textSize(50);
  fill(255, 0, 0);
  text(totalScore + " 점", width / 2, 190);
  
  
  text(totalScore*237 + " 원", width / 2, 370);
  

  // 다음 버튼
  fill(255);
  rectMode(CENTER);
  rect(width / 2, 500, 180, 40, 10);
  fill(0);
  textSize(16);
  text("다음", width / 2, 500);
  rectMode(CORNER);

  // 페이드 인 효과
  if (transitioning) {
    fill(255, transitionAlpha);
    rect(0, 0, width, height);
    transitionAlpha += 5;
    if (transitionAlpha >= 350) {
      transitionAlpha = 0;
      transitioning = false;
      gameState = "final";
    }
  }
}


function showFinalPage() {
  background(bgImg2);
  fill(random(255), random(255), random(255));
  textSize(16);
  fill(0);
 
  
  rect(40,50, 420,37)
  fill(255,0,0);
  text("...사실 당신이 만든 상품들은 전부 테무에 업로드 되었습니다...", 256, 70);
  fill(0)
  rect(40,530, 395,37)
  fill(255,0,0);
  text("...그리고 주문수가 폭증 중입니다...", 240, 550);
fill(0);
  for (let i = 0; i < madeItems.length; i++) {
    let x = 40 + (i % 2) * 250;
    let y = 100 + floor(i / 2) * 160;
    image(madeItems[i].img, x, y, 100, 100);
    textSize(14);
    text(madeItems[i].name, x + 49, y + 120);
    text("주문수 " + buy, x + 49, y + 140);
    buy++;
  }

  if (!endingStarted) {
    endingStarted = true;
    endingTimer = millis();
  }

  // 5초 뒤 페이드 아웃
  if (millis() - endingTimer > 5000) {
    fill(0, endingAlpha);
    rect(0, 0, width, height);
    endingAlpha += 5;
    if (endingAlpha >= 255) {
      endingAlpha = 0;
      gameState = "ending";
      endingStarted = false;
      nextAddTime = millis() + random(300, 1000);
    }
  }
}

function showEndingScene() {
  background(0);
  
  // 페이드인
  if (endingAlpha < 255) {
    fill(0, 255 - endingAlpha);
    rect(0, 0, width, height);
    endingAlpha += 3;
  }

  // 새로운 이미지 무작위로 일정 간격으로 추가
  if (millis() > nextAddTime && madeItems.length > 0) {
    let item = random(madeItems).img;
    let pos = randomPointInTriangle(
      createVector(250, 150),
      
      createVector(400, 400), // 꼭짓점 A
      createVector(100, 400) // 꼭짓점 B
        // 꼭짓점 C
    );
    endingImages.push({ img: item, x: pos.x, y: pos.y, size: random(40, 100) });
    nextAddTime = millis() + random(10, 500);
  }

  // 이미지들 쌓아 보여주기
  for (let i = 0; i < endingImages.length; i++) {
    let obj = endingImages[i];
    image(obj.img, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
  }

  // 안내 텍스트
  fill(255);
  textAlign(CENTER);
  textSize(18);
  text("물론 의도한 건 아니겠지만...", width / 2, 40);
  text("덕분에 새로운 쓰레기 언덕이 생겨나고 있네요!", width / 2, 530);
    text("멈출 방법은 없습니다.", width / 2, 560);
}

function randomPointInTriangle(a, b, c) {
  let r1 = sqrt(random());
  let r2 = random();
  let x = (1 - r1) * a.x + (r1 * (1 - r2)) * b.x + (r1 * r2) * c.x;
  let y = (1 - r1) * a.y + (r1 * (1 - r2)) * b.y + (r1 * r2) * c.y;
  return createVector(x, y);
}


// ---------------- 로직 ----------------
function checkWordSelection() {
  let btnW = 130, btnH = 40;
  for (let i = 0; i < allWords.length; i++) {
    let x = 40 + (i % 3) * 140;
    let y = 180 + floor(i / 3) * 60;
    if (
      mouseX > x && mouseX < x + btnW &&
      mouseY > y && mouseY < y + btnH
    ) {
      let word = allWords[i];
      if (!selectedWords.includes(word)) {
        selectedWords.push(word);
        if (selectedWords.length === 3) {
          createNextItem(selectedWords);
          selectedWords = [];
          gameState = "showing";
        }
      }
    }
  }
}

function createNextItem(words) {
  let name = words.join(" ");
  let img = imageMap[name] || createPlaceholderImage(name);
  let score = floor(random(70, 100));
  currentItem = { name, img, score };
  madeItems.push(currentItem);
  step++;
}

function createPlaceholderImage(text) {
  let pg = createGraphics(300, 300);
  pg.background(random(100, 200), random(100, 200), random(100, 200));
  pg.fill(0);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(16);
  pg.text(text, 150, 150);
  return pg;
}
