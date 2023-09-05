/*
  Warnings:

  - You are about to drop the `_MusicToPlaylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MusicToPlaylist" DROP CONSTRAINT "_MusicToPlaylist_A_fkey";

-- DropForeignKey
ALTER TABLE "_MusicToPlaylist" DROP CONSTRAINT "_MusicToPlaylist_B_fkey";

-- DropTable
DROP TABLE "_MusicToPlaylist";

-- CreateTable
CREATE TABLE "MusicToPlaylist" (
    "musicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playlistId" INTEGER NOT NULL,

    CONSTRAINT "MusicToPlaylist_pkey" PRIMARY KEY ("musicId","playlistId")
);

-- AddForeignKey
ALTER TABLE "MusicToPlaylist" ADD CONSTRAINT "MusicToPlaylist_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicToPlaylist" ADD CONSTRAINT "MusicToPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
