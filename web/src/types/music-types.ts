export interface TMusic {
  musicId: string;
  title: string;
  originalTitle: string;
  duration: number;
  author: string;
  artist: string;
  uploadDate: string;
  isMusic: boolean;
  isOfficial: boolean;
  stat?: {
    likes: number;
    listenCount: number;
  };
}
