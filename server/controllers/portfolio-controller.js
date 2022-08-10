import * as portfolioService from '../services/portfolio-service.js';

export async function getPortfolios(req, res, next) {
  try {
    const userIdx = req.currentUserIdx;
    const portfolios = await portfolioService.findPortfoliosById(userIdx);
    res.status(200).send({
      status: 200,
      message: 'portfolios 조회 성공',
      data: portfolios,
    });
  } catch (err) {
    next(err);
  }
}
export async function getPortfolio(req, res, next) {
  try {
    const portfolioIdx = req.params.portfolio_idx;
    const portfolio = await portfolioService.findPortfolioById(portfolioIdx);
    res.status(200).send({
      status: 200,
      message: 'portfolio 조회 성공',
      data: portfolio,
    });
  } catch (err) {
    next(err);
  }
}
export async function newPortfolio(req, res, next) {
  try {
    const newportfolio = await portfolioService.NewPortfolio(req.body);
    res.status(200).send({
      status: 200,
      message: 'portfolio 정보 생성',
      data: newportfolio,
    });
  } catch (err) {
    next(err);
  }
}

export async function deletePortfolio(req, res, next) {
  try {
    const portfolioIdx = req.params.portfolio_idx;
    const deletedportfolio = await portfolioService.deletePortfolio(
      portfolioIdx
    );
    res.status(200).send({
      status: 200,
      message: 'portfolio 정보 삭제 완료',
      data: deletedportfolio,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePortfolio(req, res, next) {
  try {
    const portfolioIdx = req.params.portfolio_idx;
    const updated = await portfolioService.setUser(portfolioIdx, req.body);
    res.status(201).send({
      status: 201,
      message: 'portfolio 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
