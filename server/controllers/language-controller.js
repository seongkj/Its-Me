import * as languageService from '../services/language-service.js';

export async function getLanguage(req, res, next) {
  try {
    const languageIdx = req.params.language_idx;
    const language = await languageService.findLanguageById(languageIdx);
    res.status(200).send({
      status: 200,
      message: 'Language 조회 성공',
      data: language,
    });
  } catch (err) {
    next(err);
  }
}
export async function newLanguage(req, res, next) {
  try {
    const newlanguage = await languageService.NewLanguage(req.body);
    res.status(200).send({
      status: 200,
      message: 'Language 정보 생성',
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteLanguage(req, res, next) {
  try {
    const languageIdx = req.params.language_idx;
    const deletedlanguage = await languageService.deleteLanguage(languageIdx);
    console.log(deletedlanguage);
    res.status(200).send({
      status: 200,
      message: 'Language 정보 삭제 완료',
      data: deletedlanguage,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateLanguage(req, res, next) {
  try {
    const languageIdx = req.params.language_idx;
    const updated = await languageService.setUser(languageIdx, req.body);
    res.status(201).send({
      status: 201,
      message: 'Language 정보 업데이트 완료',
      data: req.body,
    });
  } catch (err) {
    next(err);
  }
}
