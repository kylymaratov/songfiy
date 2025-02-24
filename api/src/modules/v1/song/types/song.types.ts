export interface SongTypes {
  songId: string;
  originalTitle: string;
  author: string | null;
  artist: string;
  title: string;
  isOfficial: boolean;
  duration: number;
  uploadDate: Date | null;
  isDownloading: boolean;
}
