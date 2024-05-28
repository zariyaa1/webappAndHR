import axios from "../axios";

export const fetchFeedData = async (id) => {
  try {
    const url = `content-service/apis/user/${id}/feed`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching feed Data:", err);
    throw err;
  }
};

export const fetchChallenge = async () => {
  try {
    const url = `content-service/apis/challenge`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching feed Data:", err);
    throw err;
  }
};
export const fetchMood = async () => {
  try {
    const url = `content-service/apis/mood`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching feed Data:", err);
    throw err;
  }
};
export const fetchSleep = async () => {
  try {
    const url = `content-service/apis/sleepemotion`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching feed Data:", err);
    throw err;
  }
};
export const fetchExpert = async () => {
  try {
    const url = `content-service/apis/expert`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching feed Data:", err);
    throw err;
  }
};
export const fetchResources = async () => {
  try {
    const url = `content-service/apis/blog`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching feed Data:", err);
    throw err;
  }
};
export const fetchUserData = async (id) => {
  try {
    const url = `user-management/apis/user/${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching user Data:", err);
    throw err;
  }
};
export const postMoodData = async (id, moodId) => {
  try {
    const url = `content-service/apis/user/${id}/mood`;
    const response = await axios.post(url, {
      moodId: moodId,
    });
    return response;
  } catch (err) {
    return err;
  }
};
export const postSleepData = async (id, moodId) => {
  try {
    const url = `content-service/apis/user/${id}/sleepEmotion`;
    const response = await axios.post(url, {
      sleepEmotionId: moodId,
    });
    return response;
  } catch (err) {
    return err;
  }
};
