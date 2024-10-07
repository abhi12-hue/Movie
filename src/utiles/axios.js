import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/", 
    headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzdhZTAzNjMxOWRkNDg2OGMyYzNmOWNjY2IyYmM4MSIsIm5iZiI6MTcyODAzMDYyNS45MDgxMTQsInN1YiI6IjY2ZmZhMmRmZTQ4MDE0OTE0Njg1MTA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.78sklARc0BUVBRfv0Dm8rTQeGEhdEqsna7skVwo1Gz8`,
    },
});

export default instance;
