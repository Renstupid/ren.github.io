import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCY2b6wQzw8QH8oFuobsDTigRyHBLyvTVo",
  authDomain: "realtime-database-ab43b.firebaseapp.com",
  databaseURL: "https://realtime-database-ab43b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-database-ab43b",
  storageBucket: "realtime-database-ab43b.firebasestorage.app",
  messagingSenderId: "20529421700",
  appId: "1:20529421700:web:514ac152dcb20ad45991d1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dataRef = ref(db, "priceData");

let chart = null;

function renderChart(labels, datasets) {
  const ctx = document.getElementById("priceChart").getContext("2d");
  if (chart) chart.destroy(); // 清除舊圖
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

function activateButton(id) {
  document.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

get(dataRef).then((snapshot) => {
  if (!snapshot.exists()) {
    console.error("❌ Firebase 資料不存在！");
    return;
  }

  const rawData = Object.values(snapshot.val());
  const labels = rawData.map(d => d.時間);
  const buyPer = rawData.map(d => d.均價_買進);
  const sellPer = rawData.map(d => d.均價_賣出);
  const buyTotal = rawData.map(d => d.總價_買進);
  const sellTotal = rawData.map(d => d.總價_賣出);

  const avgDatasets = [
    { label: "均價 買進", data: buyPer, borderColor: "green", fill: false },
    { label: "均價 賣出", data: sellPer, borderColor: "red", fill: false }
  ];
  const totalDatasets = [
    { label: "總價 買進", data: buyTotal, borderColor: "blue", fill: false },
    { label: "總價 賣出", data: sellTotal, borderColor: "orange", fill: false }
  ];

  // 預設顯示均價
  renderChart(labels, avgDatasets);

  // 按鈕切換事件
  document.getElementById("avgBtn").onclick = () => {
    renderChart(labels, avgDatasets);
    activateButton("avgBtn");
  };
  document.getElementById("totalBtn").onclick = () => {
    renderChart(labels, totalDatasets);
    activateButton("totalBtn");
  };

}).catch((error) => {
  console.error("❌ 讀取 Firebase 資料失敗：", error);
});
