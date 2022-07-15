import * as websiteService from '../services/website-service.js';

export async function getWebSite(req, res, next) {
  try {
    const websiteIdx = req.params.website_idx;
    const website = await websiteService.findWebSiteById(websiteIdx);
    res.status(200).send({
      status: 200,
      message: '웹사이트 조회 성공',
      data: website,
    });
  } catch (err) {
    next(err);
  }
}
export async function newWebSite(req, res, next) {
  try {
    const newwebsite = await websiteService.NewWebSite(req.body);
    res.status(200).send({
      status: 200,
      message: '웹사이트 정보 생성',
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteWebSite(req, res, next) {
  try {
    const websiteIdx = req.params.website_idx;
    const deletedwebsite = await websiteService.deleteWebSite(websiteIdx);
    console.log(deletedwebsite);
    res.status(200).send({
      status: 200,
      message: '웹사이트 정보 삭제 완료',
      data: deletedwebsite,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateWebSite(req, res, next) {
  try {
    const websiteIdx = req.params.website_idx;
    const updated = await websiteService.setUser(websiteIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '웹사이트 정보 업데이트 완료',
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
}
