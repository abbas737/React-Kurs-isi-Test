const tankBattleVideos = {
  "1-2": "https://youtu.be/2uDtXv8SacU",
  "2-1": "https://youtu.be/_Gx4qTcEaLg",

  "3-2": "https://youtu.be/2uDtXv8SacU", // Tiger vs T-34
  "2-3": "https://youtu.be/_Gx4qTcEaLg",

  "1-3": "https://youtu.be/2uDtXv8SacU",
  "2-1": "https://youtu.be/_Gx4qTcEaLg",
};

export function getBattleVideo(t1Id, t2Id) {
  const key = `${t1Id}-${t2Id}`;
  const reverseKey = `${t2Id}-${t1Id}`;

  const videoId = tankBattleVideos[key] || tankBattleVideos [reverseKey];

  return videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : null;
}