import * as portfolioModel from '../model/portfolio-model.js';

export async function findPortfolioById(portfolioIdx) {
  return await portfolioModel.getPortfolioById(portfolioIdx);
}
export async function NewPortfolio(portfolioInfo) {
  return await portfolioModel.newPortfolio(portfolioInfo);
}
export async function deletePortfolio(portfolioIdx) {
  return await portfolioModel.remove(portfolioIdx);
}

export async function setUser(portfolioIdx, portfolioInfo) {
  return await portfolioModel.update(portfolioIdx, portfolioInfo);
}
