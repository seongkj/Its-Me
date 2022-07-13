import * as profileService from '../services/profile-service.js';

export async function getProfile(req, res, next) {
  try {
    const profileIdx = req.params.profile_idx;
    const profile = await profileService.findProfileById(profileIdx);
    res.status(200).send({
      status: 200,
      message: '프로필 조회 성공',
      data: profile,
    });
  } catch (err) {
    next(err);
  }
}
export async function newProfile(req, res, next) {
  try {
    const newprofile = await profileService.NewProfile(req.body);
    res.status(200).send({
      status: 200,
      message: '새로운 프로필 생성',
      data: newprofile,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteProfile(req, res, next) {
  try {
    const profileIdx = req.params.profile_idx;
    const deletedProfile = await profileService.deleteProfile(profileIdx);
    console.log(deletedProfile);
    res.status(200).send({
      status: 200,
      message: '프로필 정보 삭제 완료',
      data: deletedProfile,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const profileIdx = req.params.profile_idx;
    const updated = await profileService.setUser(profileIdx, req.body);
    res.status(201).send({
      status: 201,
      message: '프로필 정보 업데이트 완료',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
}
