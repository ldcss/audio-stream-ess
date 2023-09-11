import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Lucas',
        email: 'ldcs@cin.ufpe.br',
        password: '12345678',
        genre: '',
        description: '',
        type: 2,
      },
      {
        name: 'Marcelo',
        email: 'mbof@cin.ufpe.br',
        password: '12345678',
        genre: '',
        description: '',
        type: 2,
      },
      {
        name: 'Enderson',
        email: 'eqg@cin.ufpe.br',
        password: '12345678',
        genre: '',
        description: '',
        type: 2,
      },
      {
        name: 'Pedro Fernandes',
        email: 'pfbc@cin.ufpe.br',
        password: '12345678',
        genre: '',
        description: '',
        type: 2,
      },
      {
        name: 'Joao Pedro',
        email: 'jpam@cin.ufpe.br',
        password: '12345678',
        genre: '',
        description: '',
        type: 2,
      },
      {
        name: 'Pedro Rodrigues',
        email: 'prcg@cin.ufpe.br',
        password: '12345678',
        genre: '',
        description: '',
        type: 2,
      },
    ],
  });
  const album = await prisma.album.createMany({
    data: [
      {
        artistId: 1,
        name: 'Lucas Daniel EP',
        description: 'Álbum feito com coração pelo aluno Lucas Daniel',
        released: true,
      },
      {
        artistId: 2,
        name: 'Um artista não compreendido',
        description: 'Album criado para todo ser inclusive aquele que habita no seu cocxis',
        released: false,
      }
    ],
  });
  const musics = await prisma.music.createMany({
    data: [
      {
        albumId: 1,
        name: 'Amo minha vida',
        description: 'Música #1 do álbum Lucas Daniel EP',
        duration: new Date('2019-01-16 22:03:02'),
      },
      {
        albumId: 1,
        name: 'Amo meu curso',
        description: 'Música #2 do álbum Lucas Daniel EP',
        duration: new Date('2019-01-16 22:04:50'),
      },
      {
        albumId: 1,
        name: 'Amo (Interlúdio)',
        description: 'Música #3 do álbum Lucas Daniel EP',
        duration: new Date('2019-01-16 22:02:02'),
      },
      {
        albumId: 1,
        name: 'Amo amar ft. Justin Timberlake',
        description: 'Música #4 do álbum Lucas Daniel EP, com participação de Justin Timberlake',
        duration: new Date('2019-01-16 22:03:02'),
      },
      {
        albumId: 1,
        name: 'Amo mais do que lasanha',
        description: 'Música #5 do álbum Lucas Daniel EP',
        duration: new Date('2019-01-16 22:01:34'),
      },
      {
        albumId: 1,
        name: 'Para sempre',
        description: 'Música #6 do álbum Lucas Daniel EP',
        duration: new Date('2019-01-16 22:05:22'),
      },
      {
        albumId: 1,
        name: 'Ocupado',
        description: 'Música #7 do álbum Lucas Daniel EP',
        duration: new Date('2019-01-16 22:03:12'),
      },
      {
        albumId: 1,
        name: 'Telefone clonado',
        description: 'Música #8 do álbum Lucas Daniel EP',
        duration: new Date('2019-01-16 22:03:44'),
      },
    ],
  });
  const playlists = await prisma.playlist.createMany({
    data: [
      {
        name: 'Melhores do forró',
        genre: 'Forró',
        description: 'As melhores do forró pernambucano',
        ownerId: 1,
      },
      {
        name: 'Frank Ocean Radio',
        genre: 'R&B',
        description: 'As melhores do frank oceano',
        ownerId: 1,
      },
      {
        name: 'Rock brasileiro',
        genre: 'Rock',
        description: 'ROCK BRASILEIRO PAULERA',
        ownerId: 2,
      },
      { name: 'MPB 90s', genre: 'MPB', description: 'MPB clássicos', ownerId: 3 },
      { name: 'Funk pernambucano', genre: 'Funk', description: 'Funk carioca', ownerId: 4 },
      { name: 'Grime UK', genre: 'Grime', description: 'grime dril', ownerId: 4 },
      {
        name: 'Melhores de Lucas Daniel EP',
        genre: 'Forró',
        description: 'forró ciniano',
        ownerId: 1,
      },
    ],
  });
  const playlistMusics = await prisma.musicToPlaylist.createMany({
    data: [
      { musicId: 2, playlistId: 7 },
      { musicId: 4, playlistId: 3 },
      { musicId: 1, playlistId: 4 },
      { musicId: 7, playlistId: 7 },
    ],
  });
  const likes = await prisma.likes.createMany({
    data: [
      { userId: 1, playlistId: 2 },
      { userId: 1, playlistId: 3 },
      { userId: 3, playlistId: 1 },
      { userId: 2, playlistId: 1 },
      { userId: 2, playlistId: 2 },
    ],
  });
  console.log({ users, album, musics, playlists, playlistMusics, likes });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
