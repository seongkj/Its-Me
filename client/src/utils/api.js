import axios from 'axios';

const BASE_URL = `http://localhost:3001`;

// 포트폴리오 조회 GET (로그인 유저가 가진 포트폴리오)
export async function getPortfolios() {
  const result = await axios.get(`${BASE_URL}/portfolios`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` || 'not found',
    },
  });
  return result.data.data;
}

// 포트폴리오 조회 GET (포트롤리오_idx)
export async function getPortfolio(idx) {
  const result = await axios.get(`${BASE_URL}/portfolios/${idx}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` || 'not found',
    },
  });
  return result.data.data;
}

// 포트폴리오 생성 POST
export async function postPortfolios(data) {
  const result = await axios.post(`${BASE_URL}/portfolios`, data);
  return result.data.data;
}

// 포트폴리오 삭제 delete
export async function deletePortfolios(idx) {
  const result = await axios.delete(`${BASE_URL}/portfolios/${idx}`);
  return result.data.data;
}
