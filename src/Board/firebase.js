import firebase from 'firebase/app';
import 'firebase/database';

// Firebase SDK 초기화
const firebaseConfig = {
    // Firebase 설정 정보 입력
    apiKey: "AIzaSyCdVYm92IfzAl0HzJw_5FonVitfWxWv0vU",
    authDomain: "chat-test-cf3e2.firebaseapp.com",
    projectId: "chat-test-cf3e2",
    storageBucket: "chat-test-cf3e2.appspot.com",
    messagingSenderId: "733199163568",
    appId: "1:733199163568:web:dd926a02258b2d80015b75",
    // measurementId: "G-HP7ZFVHHVR"
    // databaseURL: "https://PROJECT_ID.firebaseio.com"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// 데이터베이스 참조 생성
const database = firebase.database();

// 내보내기
export default database;