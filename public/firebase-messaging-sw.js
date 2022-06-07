importScripts('https://www.gstatic.com/firebasejs/9.6.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.2/firebase-messaging-compat.js');


const firebaseConfig = {
    apiKey: "AIzaSyDMyUOSO0FuBhAUZCywUJQ82dB0UPFxSpo",
    authDomain: "sapo-market-dev-1600656381055.firebaseapp.com",
    databaseURL: "https://sapo-market-dev-1600656381055.firebaseio.com",
    projectId: "sapo-market-dev-1600656381055",
    storageBucket: "sapo-market-dev-1600656381055.appspot.com",
    messagingSenderId: "150976598125",
    appId: "1:150976598125:web:13f5410d9c7baddf802f64",
    measurementId: "G-PDVDKBNNDL"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

//Đoạn onBackgroundMessage này không cần thiết nếu chỉ có nhu cầu hiển thị noti. 
//Thư viện firebase đã tự động hiển thị cho rồi
//Ở đây sẽ làm để thông báo đến client khi chạy background (vẫn mở tab trình duyệt nhưng không focus)
//Dùng BroadCastChannel
const broadCastChannel = new BroadcastChannel('notification')
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  broadCastChannel.postMessage(payload);
});